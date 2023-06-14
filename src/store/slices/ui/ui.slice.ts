import { createSlice } from '@reduxjs/toolkit';
import { UI_INIT_STATE } from './ui.slice.const';
import type { TMessage } from './ui.slice.type';

/* eslint-disable no-param-reassign */

const uiSlice = createSlice({
  name: 'ui',
  initialState: UI_INIT_STATE,
  reducers: {
    setSuccessMessageUi(state, action: { payload: TMessage | undefined }) {
      state.successMessage = action.payload;
    },
    setWarningMessageUi(state, action: { payload: TMessage | undefined }) {
      state.warningMessage = action.payload;
    },
    setInfoMessageUi(state, action: { payload: TMessage | undefined }) {
      state.infoMessage = action.payload;
    },
    setErrorMessageUi(state, action: { payload: TMessage | undefined }) {
      state.errorMessage = action.payload;
    },
    setPathnameUi(state, action: { payload: Location['pathname'] }) {
      state.pathname = action.payload;
    },
    setIsCartOpenedUi(state, action: { payload: { isOpened: boolean | 'toggle' } }) {
      state.isCartOpened =
        typeof action.payload.isOpened === 'boolean'
          ? action.payload.isOpened
          : !state.isCartOpened;
    },
    setIsSidebarOpenedUi(state, action: { payload: { isOpened: boolean | 'toggle' } }) {
      state.isSidebarOpened =
        typeof action.payload.isOpened === 'boolean'
          ? action.payload.isOpened
          : !state.isSidebarOpened;
    },
    initiateColorModeChangeUi(state) {
      state.colorModeChangeStatus = 'ongoing';
    },
    finalizeColorModeChangeUi(state) {
      state.colorModeChangeStatus = 'completed';
    },
    setIsMobileUi(state, action: { payload: { isMobile: boolean } }) {
      state.isMobile = action.payload.isMobile;
    },
    setColorModeToggleCoordsUi(state, action: { payload: { x: number; y: number } }) {
      state.colorModeToogleCoords = action.payload;
    },
    setScreenDetailsUi(state, action: { payload: { w: number; h: number } }) {
      state.screenDetails = action.payload;
    },
    setSelectedSectionIdxUi(
      state,
      action: {
        payload: {
          sectionIdx: number;
        };
        type: string;
      },
    ) {
      state.selectedSectionIdx = action.payload.sectionIdx;
    },
  },
});

const ui = uiSlice.reducer;
const {
  setSuccessMessageUi,
  setWarningMessageUi,
  setInfoMessageUi,
  setPathnameUi,
  setIsCartOpenedUi,
  setIsSidebarOpenedUi,
  setErrorMessageUi,
  initiateColorModeChangeUi,
  finalizeColorModeChangeUi,
  setIsMobileUi,
  setColorModeToggleCoordsUi,
  setScreenDetailsUi,
  setSelectedSectionIdxUi,
} = uiSlice.actions;

export {
  ui,
  setIsCartOpenedUi,
  setIsSidebarOpenedUi,
  setPathnameUi,
  setSuccessMessageUi,
  setWarningMessageUi,
  setInfoMessageUi,
  setErrorMessageUi,
  initiateColorModeChangeUi,
  finalizeColorModeChangeUi,
  setIsMobileUi,
  setColorModeToggleCoordsUi,
  setScreenDetailsUi,
  setSelectedSectionIdxUi,
};
