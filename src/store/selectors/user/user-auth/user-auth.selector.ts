import { createSelector } from 'reselect';
import type { TRootState } from '../../../redux.store.type';

const userAuthLoadingStatusSelector = (state: TRootState) => state.user.loadingStatus;
const userAuthIsAuthenticatedSelector = (state: TRootState) => state.user.isAuthenticated;
const userInfoUsernameSelector = (state: TRootState) => state.user.username;
const userInfoEmailSelector = (state: TRootState) => state.user.email;
const userInfoSelector = createSelector(
  userInfoUsernameSelector,
  userInfoEmailSelector,
  (username, email) => ({
    username,
    email,
  }),
);

export {
  userAuthLoadingStatusSelector,
  userAuthIsAuthenticatedSelector,
  userInfoUsernameSelector,
  userInfoSelector,
};
