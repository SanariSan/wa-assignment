import type { TRootState } from '../../redux.store.type';

const guideHasTriedThemeChangeSelector = (state: TRootState) => state.guide.hasTriedThemeChange;
const guideHasTriedOpeningCartSelector = (state: TRootState) => state.guide.hasTriedOpeningCart;
const guideHasTriedPuttingEntitesToCartSelector = (state: TRootState) =>
  state.guide.hasTriedPuttingEntitesToCart;
const guideHasTriedAuthSelector = (state: TRootState) => state.guide.hasTriedAuth;

export {
  guideHasTriedThemeChangeSelector,
  guideHasTriedOpeningCartSelector,
  guideHasTriedPuttingEntitesToCartSelector,
  guideHasTriedAuthSelector,
};
