import { createSlice } from '@reduxjs/toolkit';
import type {
  TAccessLoginOutgoingFields,
  TAccessRegisterOutgoingFields,
} from '../../../services/api';
import type { TLoadingStatus } from '../slices.type';
import { USER_AUTH_INIT_STATE } from './user.slice.const';
import type { TIsAuthenticated } from './user.slice.type';

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
    setUserInfo(state, action: { payload: { username?: string; email?: string }; type: string }) {
      Object.entries(action.payload).forEach(([key, val]) => {
        state[key] = val;
      });
    },
    // sagas
    checkUserAuthStatusAsync() {},
    registerUserAsync(
      state,
      action: { payload: Partial<TAccessRegisterOutgoingFields>; type: string },
    ) {},
    loginUserAsync(
      state,
      action: { payload: Partial<TAccessLoginOutgoingFields>; type: string },
    ) {},
    logoutUserAsync() {},
  },
});

const user = userSlice.reducer;
const {
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserAuthStatusAsync,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
  setUserInfo,
} = userSlice.actions;

export {
  user,
  setUserIsAuthenticated,
  setUserAuthLoadStatus,
  checkUserAuthStatusAsync,
  registerUserAsync,
  loginUserAsync,
  logoutUserAsync,
  setUserInfo,
};
