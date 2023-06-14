import type { TLoadingStatus } from '../slices.type';

type TIsAuthenticated = 'idle' | boolean;

type TUserAuthInitState = {
  isAuthenticated: TIsAuthenticated;
  loadingStatus: TLoadingStatus;
  username?: string;
  email?: string;
};

export type { TUserAuthInitState, TIsAuthenticated };
