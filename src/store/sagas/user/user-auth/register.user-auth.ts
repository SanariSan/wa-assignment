import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  TAccessRegisterIncomingFailureFields,
  TAccessRegisterIncomingSuccessFields,
  TAccessRegisterOutgoingFields,
} from '../../../../services/api';
import { AccessRegisterOutgoingDTO, registerUser, validateDTO } from '../../../../services/api';
import {
  registerUserAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../../../../general.type';

function* registerUserWorker(action: {
  type: string;
  payload: Partial<TAccessRegisterOutgoingFields>;
}) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: AccessRegisterOutgoingDTO,
        value: action.payload,
      }),
    )) as TSafeReturn<TAccessRegisterOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(validateStatus.error.message) }),
      );
      return;
    }

    const fetchStatus = (yield safe(
      call(registerUser, { dto: validateStatus.response, abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TAccessRegisterIncomingSuccessFields;
      failure?: TAccessRegisterIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'success', message: 'Successfully registered!' }));
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

function* userRegisterWatcher() {
  yield takeLatest(registerUserAsync, registerUserWorker);
}

export { userRegisterWatcher };
