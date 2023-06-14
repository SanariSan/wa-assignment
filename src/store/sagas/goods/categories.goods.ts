import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  TGoodsCategoriesIncomingFailureFields,
  TGoodsCategoriesIncomingSuccessFields,
} from '../../../services/api';
import { getCategories } from '../../../services/api';
import { fetchCategoriesAsync, setCategories, setCategoriesLoadStatus } from '../../slices';
import { ELOG_LEVEL } from '../../../general.type';
import { publishLog } from '../../../modules/access-layer/events/pubsub';

function* categoriesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setCategoriesLoadStatus({ status: 'loading' }));

    const fetchStatus = (yield safe(
      call(getCategories, { abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TGoodsCategoriesIncomingSuccessFields;
      failure?: TGoodsCategoriesIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setCategoriesLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      const { categories } = fetchStatus.response.success.data;
      yield put(setCategoriesLoadStatus({ status: 'success' }));
      yield put(setCategories({ categories }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setCategoriesLoadStatus({
          status: 'failure',
          message: String(fetchStatus.response.failure.detail),
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

function* categoriesWatcher() {
  yield takeLatest(fetchCategoriesAsync, categoriesWorker);
}

export { categoriesWatcher };
