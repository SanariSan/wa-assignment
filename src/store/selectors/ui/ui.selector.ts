import { createSelector } from '@reduxjs/toolkit';
import { SIDEBAR_TEMPLATE } from '../../../const';
import type { TCategoriesExist } from '../../../helpers/selectors';
import { buildCategoryRouteQueue } from '../../../helpers/selectors';
import type { TRootState } from '../../redux.store.type';
import { goodsCategoriesSelector, goodsSelectedCategorySelector } from '../goods';

const uiCartStateSelector = (state: TRootState) => state.ui.isCartOpened;
const uiPathnameSelector = (state: TRootState) => state.ui.pathname;
const uiSidebarStateSelector = (state: TRootState) => state.ui.isSidebarOpened;
const uiSuccessSelector = (state: TRootState) => state.ui.successMessage;
const uiWarningSelector = (state: TRootState) => state.ui.warningMessage;
const uiInfoSelector = (state: TRootState) => state.ui.infoMessage;
const uiErrorSelector = (state: TRootState) => state.ui.errorMessage;
const uiColorModeChangeStatusSelector = (state: TRootState) => state.ui.colorModeChangeStatus;
const uiColorModeAnimationDurationSelector = (state: TRootState) =>
  state.ui.colorModeAnimationDuration;
const uiIsMobileSelector = (state: TRootState) => state.ui.isMobile;
const uiColorModeToogleCoordsSelector = (state: TRootState) => state.ui.colorModeToogleCoords;
const uiScreenDetailsSelector = createSelector(
  (state: TRootState) => state.ui.screenDetails,
  (screenDetails) => screenDetails,
);
const uiSelectedSectionIdxSelector = (state: TRootState) => state.ui.selectedSectionIdx;
const uiSelectedSectionSelector = createSelector(uiSelectedSectionIdxSelector, (sectionIdx) => {
  if (SIDEBAR_TEMPLATE[sectionIdx] === undefined) return;
  return SIDEBAR_TEMPLATE[sectionIdx];
});
const uiSelectedCategoryRouteSelector = createSelector(
  goodsCategoriesSelector,
  goodsSelectedCategorySelector,
  (categories, selectedCategory) =>
    buildCategoryRouteQueue({
      categoriesArr: categories as TCategoriesExist,
      target: selectedCategory?.title,
    }),
);
const uiSelectedCategoryRouteBreadcrumbFormattedSelector = createSelector(
  uiSelectedCategoryRouteSelector,
  (route) => route.map((_) => ({ title: _, pathname: _ })),
);

export {
  uiCartStateSelector,
  uiPathnameSelector,
  uiSidebarStateSelector,
  uiSuccessSelector,
  uiWarningSelector,
  uiInfoSelector,
  uiErrorSelector,
  uiColorModeChangeStatusSelector,
  uiColorModeAnimationDurationSelector,
  uiIsMobileSelector,
  uiColorModeToogleCoordsSelector,
  uiScreenDetailsSelector,
  uiSelectedSectionIdxSelector,
  uiSelectedSectionSelector,
  uiSelectedCategoryRouteSelector,
  uiSelectedCategoryRouteBreadcrumbFormattedSelector,
};
