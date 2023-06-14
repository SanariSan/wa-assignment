import { createSlice } from '@reduxjs/toolkit';
import { GUIDE_INIT_STATE } from './guide.slice.const';

/* eslint-disable no-param-reassign */

const guideSlice = createSlice({
  name: 'guide',
  initialState: GUIDE_INIT_STATE,
  reducers: {
    setHasTriedThemeChange(state, action: { payload: boolean }) {
      if (state.hasTriedThemeChange !== action.payload) state.hasTriedThemeChange = action.payload;
    },
    setHasTriedOpeningCart(state, action: { payload: boolean }) {
      if (state.hasTriedOpeningCart !== action.payload) state.hasTriedOpeningCart = action.payload;
    },
    setHasTriedPuttingEntitesToCart(state, action: { payload: boolean }) {
      if (state.hasTriedPuttingEntitesToCart !== action.payload)
        state.hasTriedPuttingEntitesToCart = action.payload;
    },
    setHasTriedAuth(state, action: { payload: boolean }) {
      if (state.hasTriedAuth !== action.payload) state.hasTriedAuth = action.payload;
    },
  },
});

const guide = guideSlice.reducer;
const {
  setHasTriedThemeChange,
  setHasTriedOpeningCart,
  setHasTriedPuttingEntitesToCart,
  setHasTriedAuth,
} = guideSlice.actions;

export {
  guide,
  setHasTriedThemeChange,
  setHasTriedOpeningCart,
  setHasTriedPuttingEntitesToCart,
  setHasTriedAuth,
};
