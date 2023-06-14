import { call, cancelled, delay, put, select, takeLatest } from 'redux-saga/effects';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import type {
  TGoodsEntitiesIncomingFailureFields,
  TGoodsEntitiesIncomingSuccessFields,
  TGoodsEntitiesOutgoingFields,
} from '../../../services/api';
import { GoodsEntitiesOutgoingDTO, getEntities, validateDTO } from '../../../services/api';
import {
  goodsOffsetPerPageSelector,
  goodsOffsetSelector,
  goodsSelectedCategorySelector,
  goodsSelectedModifierSelector,
} from '../../selectors';
import type { TSelectedCategory, TSelectedModifier } from '../../slices';
import {
  fetchMoreEntitiesAsync,
  increaseOffset,
  pushEntities,
  setEntitiesLoadStatus,
  setHasMoreEntities,
  setTotalQty,
} from '../../slices';
import { ELOG_LEVEL } from '../../../general.type';
import { publishLog } from '../../../modules/access-layer/events/pubsub';

function* entitiesWorker(action: { type: string }) {
  const abortController = new AbortController();
  try {
    yield put(setEntitiesLoadStatus({ status: 'loading' }));
    // yield delay(500);

    const [selectedCategory, selectedModifier, offset, offsetPerPage] = [
      {
        ...((yield select(goodsSelectedCategorySelector)) as TSelectedCategory | undefined),
      },
      {
        ...((yield select(goodsSelectedModifierSelector)) as TSelectedModifier | undefined),
      },
      (yield select(goodsOffsetSelector)) as number,
      (yield select(goodsOffsetPerPageSelector)) as number,
    ];

    const validateStatus = (yield safe(
      call(validateDTO, {
        schema: GoodsEntitiesOutgoingDTO,
        value: {
          category: selectedCategory.title,
          modifier: selectedModifier.title,
          offset,
          qty: offsetPerPage,
        },
      }),
    )) as TSafeReturn<TGoodsEntitiesOutgoingFields>;

    if (validateStatus.error !== undefined) {
      yield put(
        setEntitiesLoadStatus({ status: 'failure', message: String(validateStatus.error.message) }),
      );
      return;
    }

    const fetchStatus = (yield safe(
      call(getEntities, { params: validateStatus.response, abortSignal: abortController.signal }),
    )) as TSafeReturn<{
      success?: TGoodsEntitiesIncomingSuccessFields;
      failure?: TGoodsEntitiesIncomingFailureFields;
    }>;

    publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

    if (fetchStatus.error !== undefined) {
      yield put(
        setEntitiesLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
      );
      return;
    }

    if (fetchStatus.response.success !== undefined) {
      yield put(pushEntities({ entities: fetchStatus.response.success.data.entities }));
      yield put(setTotalQty({ amount: fetchStatus.response.success.data.totalQty }));
      yield put(setHasMoreEntities({ hasMore: fetchStatus.response.success.data.hasMore }));

      if (fetchStatus.response.success.data.hasMore) {
        yield put(increaseOffset());
      }

      yield put(setEntitiesLoadStatus({ status: 'success' }));
      return;
    }

    if (fetchStatus.response.failure !== undefined) {
      yield put(
        setEntitiesLoadStatus({
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

function* entitiesWatcher() {
  yield takeLatest(fetchMoreEntitiesAsync, entitiesWorker);
}

export { entitiesWatcher };
