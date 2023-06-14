import { createSlice, current } from '@reduxjs/toolkit';
import type { TLoadingStatus } from '../slices.type';
import { GOODS_INIT_STATE } from './goods.slice.const';
import type { TCategories, TEntities } from './goods.slice.type';

/* eslint-disable no-param-reassign */

const goodsSlice = createSlice({
  name: 'goods',
  initialState: GOODS_INIT_STATE,
  reducers: {
    setCategories(
      state,
      action: {
        payload: {
          categories: TCategories;
        };
        type: string;
      },
    ) {
      state.categories = action.payload.categories;
    },
    setSelectedCategoryIdx(
      state,
      action: {
        payload: {
          categoryIdx: number;
        };
        type: string;
      },
    ) {
      if (state.selectedCategoryIdx === action.payload.categoryIdx) {
        return;
      }

      state.entities.length = 0;
      state.offset = 0;

      if (current(state).categories[action.payload.categoryIdx] === undefined) {
        state.selectedCategoryIdx = -1;
        state.selectedModifierIdx = -1;
        return;
      }

      state.selectedCategoryIdx = action.payload.categoryIdx;
      state.selectedModifierIdx = -1;
    },
    setSelectedModifierIdx(
      state,
      action: {
        payload: {
          modifierIdx: number;
        };
        type: string;
      },
    ) {
      if (state.selectedModifierIdx === action.payload.modifierIdx) return;

      const currState = current(state);
      const selectedCategory = currState.categories[currState.selectedCategoryIdx];

      // purely for type safety, not possible until I implement modifiers that work without category
      if (selectedCategory === undefined) return;

      state.entities.length = 0;
      state.offset = 0;

      // if non existing modifier or -1
      if (selectedCategory.modifiers?.[action.payload.modifierIdx] === undefined) {
        state.selectedModifierIdx = -1;
        return;
      }

      state.selectedModifierIdx = action.payload.modifierIdx;
    },
    increaseOffset(state) {
      state.offset += state.offsetPerPage;
    },
    setTotalQty(
      state,
      action: {
        payload: { amount: number };
        type: string;
      },
    ) {
      state.totalQty = action.payload.amount;
    },
    setHasMoreEntities(
      state,
      action: {
        payload: { hasMore: boolean };
        type: string;
      },
    ) {
      state.hasMoreEntities = action.payload.hasMore;
    },
    pushEntities(
      state,
      action: {
        payload: { entities: TEntities };
        type: string;
      },
    ) {
      state.entities.push(...action.payload.entities);
    },
    pushLikedEntity(
      state,
      action: {
        payload: {
          entityId: TEntities[number]['id'];
        };
        type: string;
      },
    ) {
      const targetEntity = current(state.entities).find(
        (entity) => entity.id === action.payload.entityId,
      );
      const isInLiked = current(state.likedEntities).some(
        (entity) => entity.id === action.payload.entityId,
      );

      if (targetEntity !== undefined && !isInLiked) {
        state.likedEntities.push(targetEntity);
      }
    },
    removeLikedEntity(
      state,
      action: {
        payload: {
          entityId: TEntities[number]['id'];
        };
        type: string;
      },
    ) {
      const targetIdx = current(state.likedEntities).findIndex(
        (el) => el.id === action.payload.entityId,
      );

      if (targetIdx !== -1) {
        state.likedEntities.splice(targetIdx, 1);
      }
    },
    pushCartEntity(
      state,
      action: {
        payload: {
          entityId: TEntities[number]['id'];
        };
        type: string;
      },
    ) {
      const targetEntity =
        current(state.entities).find((entity) => entity.id === action.payload.entityId) ??
        current(state.likedEntities).find((entity) => entity.id === action.payload.entityId);

      if (targetEntity !== undefined) {
        state.cart.push(targetEntity);
      }
    },
    removeCartEntity(
      state,
      action: {
        payload: {
          entityId: TEntities[number]['id'];
          modifier?: 'one' | 'all';
        };
        type: string;
      },
    ) {
      const cart: TEntities = current(state.cart) as TEntities;

      if (action.payload.modifier === undefined || action.payload.modifier === 'one') {
        const targetIdx: number = cart.findLastIndex((el) => el.id === action.payload.entityId);

        if (targetIdx !== -1) {
          state.cart.splice(targetIdx, 1);
        }
      } else {
        state.cart = cart.filter((el) => el.id !== action.payload.entityId);
      }
    },
    purgeCart(state) {
      state.cart.length = 0;
    },
    setEntitiesLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.entitiesLoadingStatus = action.payload.status;
    },
    setCategoriesLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.categoriesLoadingStatus = action.payload.status;
    },
    // sagas
    fetchCategoriesAsync() {},
    fetchMoreEntitiesAsync() {},
  },
});

const goods = goodsSlice.reducer;
const {
  setCategories,
  setSelectedCategoryIdx,
  setSelectedModifierIdx,
  increaseOffset,
  setTotalQty,
  setHasMoreEntities,
  pushEntities,
  pushLikedEntity,
  removeLikedEntity,
  pushCartEntity,
  removeCartEntity,
  purgeCart,
  setEntitiesLoadStatus,
  setCategoriesLoadStatus,
  fetchCategoriesAsync,
  fetchMoreEntitiesAsync,
} = goodsSlice.actions;

export {
  goods,
  setCategories,
  setSelectedCategoryIdx,
  setSelectedModifierIdx,
  increaseOffset,
  setTotalQty,
  setHasMoreEntities,
  pushEntities,
  pushLikedEntity,
  pushCartEntity,
  removeCartEntity,
  purgeCart,
  removeLikedEntity,
  setEntitiesLoadStatus,
  setCategoriesLoadStatus,
  fetchCategoriesAsync,
  fetchMoreEntitiesAsync,
};
