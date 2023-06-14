import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../../general.type';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type {
  TAccessLoginIncomingFailureFields,
  TAccessLoginIncomingSuccessFields,
  TAccessLoginOutgoingFields,
} from '../../../../services/api';
import { AccessLoginOutgoingDTO, loginUser, validateDTO } from '../../../../services/api';
import {
  loginUserAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

function* loginUserWorker(action: { type: string; payload: Partial<TAccessLoginOutgoingFields> }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: AccessLoginOutgoingDTO,
        value: action.payload,
      }),
    )) as TSafeReturn<TAccessLoginOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(validateStatus.error.message) }),
      );
      return;
    }

    const fetchStatus = (yield safe(
      call(loginUser, { dto: validateStatus.response, abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TAccessLoginIncomingSuccessFields;
      failure?: TAccessLoginIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'success', message: 'Successfully logged in!' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.success.data.isAuthenticated }),
      );
      yield put(setUserInfo(fetchStatus.response.success.data));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setUserAuthLoadStatus({
          status: 'failure',
          message: String(fetchStatus.response.failure.detail),
        }),
      );
      yield put(
        setUserIsAuthenticated({
          status: fetchStatus.response.failure.miscellaneous.isAuthenticated,
        }),
      );
      return;
    }
  } finally {
    if ((yield cancelled()) as boolean) {
      abortController.abort();
    }
  }
}

function* userLoginWatcher() {
  yield takeLatest(loginUserAsync, loginUserWorker);
}

export { userLoginWatcher };
