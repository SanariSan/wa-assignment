import type {
  TGoodsCategoriesIncomingSuccessFields,
  TGoodsEntitiesIncomingSuccessFields,
} from '../../../services/api';
import type { TLoadingStatus } from '../slices.type';

type TEntities = TGoodsEntitiesIncomingSuccessFields['data']['entities'];
type TCategories = TGoodsCategoriesIncomingSuccessFields['data']['categories'];
type TSelectedCategory = Exclude<TCategories[number], undefined>;
type TSelectedModifier = Exclude<TSelectedCategory['modifiers'], undefined>[number];

type TGoodsInitState = {
  entities: TEntities;
  likedEntities: TEntities;
  categories: TCategories;
  cart: TEntities;
  selectedCategoryIdx: number;
  selectedModifierIdx: number;
  offset: number;
  offsetPerPage: number;
  hasMoreEntities: boolean;
  totalQty: number;
  entitiesLoadingStatus: TLoadingStatus;
  categoriesLoadingStatus: TLoadingStatus;
};

export type { TEntities, TCategories, TSelectedCategory, TSelectedModifier, TGoodsInitState };
