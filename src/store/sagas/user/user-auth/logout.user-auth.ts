import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../../helpers/sagas';
import { safe } from '../../../../helpers/sagas';
import type {
  TAccessLogoutIncomingFailureFields,
  TAccessLogoutIncomingSuccessFields,
} from '../../../../services/api';
import { logoutUser } from '../../../../services/api';
import { logoutUserAsync, setUserAuthLoadStatus, setUserIsAuthenticated } from '../../../slices';
import { ELOG_LEVEL } from '../../../../general.type';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';

function* logoutUserWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setUserAuthLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(logoutUser, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TAccessLogoutIncomingSuccessFields;
      failure?: TAccessLogoutIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setUserAuthLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(setUserAuthLoadStatus({ status: 'success', message: 'Successfully logged out!' }));
      yield put(
        setUserIsAuthenticated({ status: fetchStatus.response.success.data.isAuthenticated }),
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

function* userLogoutWatcher() {
  yield takeLatest(logoutUserAsync, logoutUserWorker);
}

export { userLogoutWatcher };
