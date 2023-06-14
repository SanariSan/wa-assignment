import type { TGoodsInitState } from './goods.slice.type';

const GOODS_INIT_STATE: TGoodsInitState = {
  entities: [],
  likedEntities: [],
  categories: [],
  cart: [],
  selectedCategoryIdx: -1,
  selectedModifierIdx: -1,
  offset: 0,
  offsetPerPage: 20,
  hasMoreEntities: true,
  totalQty: Number.POSITIVE_INFINITY,
  entitiesLoadingStatus: 'idle',
  categoriesLoadingStatus: 'idle',
};

export { GOODS_INIT_STATE };
