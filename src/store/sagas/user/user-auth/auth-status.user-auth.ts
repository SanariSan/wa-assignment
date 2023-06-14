import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../../general.type';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type {
  TAccessCheckSessionIncomingFailureFields,
  TAccessCheckSessionIncomingSuccessFields,
  TAccessCheckSessionOutgoingFields,
} from '../../../../services/api';
import {
  AccessCheckSessionOutgoingDTO,
  checkUserAuthStatus,
  validateDTO,
} from '../../../../services/api';
import {
  checkUserAuthStatusAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

function* checkUserAuthStatusWorker(action: {
  type: string;
  payload: Partial<TAccessCheckSessionOutgoingFields>;
}) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: AccessCheckSessionOutgoingDTO,
        value: action.payload,
      }),
    )) as TSafeReturn<TAccessCheckSessionOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'failure' }));
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    const fetchStatus = (yield safe(
      call(checkUserAuthStatus, {
        dto: validateStatus.response,
        abortSignal: abortController.signal,
      }),
    )) as TSafeReturn<{
      success?: TAccessCheckSessionIncomingSuccessFields;
      failure?: TAccessCheckSessionIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'success', message: 'Session checked successfully!' }),
      );
      yield put(setUserIsAuthenticated({ status: true }));
      yield put(
        setUserInfo({
          idInstance: validateStatus.response.idInstance,
          apiTokenInstance: validateStatus.response.apiTokenInstance,
          wid: fetchStatus.response.success.wid,
        }),
      );
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
          status: false,
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

function* userAuthStatusWatcher() {
  yield takeLatest(checkUserAuthStatusAsync, checkUserAuthStatusWorker);
}

export { userAuthStatusWatcher };
