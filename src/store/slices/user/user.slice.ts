import { createSlice } from '@reduxjs/toolkit';
import type { TLoadingStatus } from '../slices.type';
import { USER_AUTH_INIT_STATE } from './user.slice.const';
import type { TIsAuthenticated, TUserAuthInitState } from './user.slice.type';
import type { TAccessCheckSessionOutgoingFields } from '../../../services/api';

/* eslint-disable no-param-reassign */

// example of action creator for saga if decide to move those empty ones
// const registerUserAsync = (payload: IAccessRegisterOutgoingDM) => ({
//   type: 'userAuth/registerUserAsync',
//   payload,
// });

const userSlice = createSlice({
  name: 'user',
  initialState: USER_AUTH_INIT_STATE,
  reducers: {
    setUserIsAuthenticated(state, action: { payload: { status: TIsAuthenticated }; type: string }) {
      state.isAuthenticated = action.payload.status;
    },
    setUserAuthLoadStatus(
      state,
      action: { payload: { status: TLoadingStatus; message?: string }; type: string },
    ) {
      state.loadingStatus = action.payload.status;
    },
    setUserInfo(state, action: { payload: Partial<TUserAuthInitState>; type: string }) {
      Object.entries(action.payload).forEach(([key, val]) => {
        state[key] = val;
      });
    },
    // sagas
    checkUserAuthStatusAsync(
      state,
      action: { payload: Partial<TAccessCheckSessionOutgoingFields>; type: string },
    ) {},
    logoutUserAsync() {},
  },
});

const user = userSlice.reducer;
const {
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserAuthStatusAsync,
  logoutUserAsync,
  setUserInfo,
} = userSlice.actions;

export {
  user,
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserAuthStatusAsync,
  logoutUserAsync,
  setUserInfo,
};
