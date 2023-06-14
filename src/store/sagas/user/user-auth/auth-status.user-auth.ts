import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../../general.type';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type {
  TAccessCheckSessionIncomingFailureFields,
  TAccessCheckSessionIncomingSuccessFields,
} from '../../../../services/api';
import { checkUserAuthStatus } from '../../../../services/api';
import {
  checkUserAuthStatusAsync,
  setUserAuthLoadStatus,
  setUserInfo,
  setUserIsAuthenticated,
} from '../../../slices';

function* checkUserAuthStatusWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(checkUserAuthStatus, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TAccessCheckSessionIncomingSuccessFields;
      failure?: TAccessCheckSessionIncomingFailureFields;
    }>;
    // as TSafeReturn<Awaited<ReturnType<typeof checkUserAuthStatus>>>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      yield put(setUserIsAuthenticated({ status: false }));
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'success' }));
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

function* userAuthStatusWatcher() {
  yield takeLatest(checkUserAuthStatusAsync, checkUserAuthStatusWorker);
}

export { userAuthStatusWatcher };
