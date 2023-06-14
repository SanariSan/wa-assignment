import type { TGoodsCategoriesIncomingSuccessFields } from '../../../services/api';

type TMessage = {
  title?: string;
  description?: string;
};

type TCategories = TGoodsCategoriesIncomingSuccessFields['data']['categories'];
type TSelectedCategory = Exclude<TCategories[number], undefined>;
type TSelectedModifier = Exclude<TSelectedCategory['modifiers'], undefined>[number];

type TUiInitState = {
  successMessage: TMessage | undefined;
  infoMessage: TMessage | undefined;
  warningMessage: TMessage | undefined;
  errorMessage: TMessage | undefined;
  pathname: Location['pathname'];
  isCartOpened: boolean;
  isSidebarOpened: boolean;
  colorModeAnimationDuration: number;
  colorModeChangeStatus: 'completed' | 'ongoing';
  isMobile: boolean;
  colorModeToogleCoords: { x: number; y: number };
  screenDetails: {
    w: number;
    h: number;
  };
  selectedSectionIdx: number;
};

export type { TMessage, TUiInitState, TCategories, TSelectedCategory, TSelectedModifier };
