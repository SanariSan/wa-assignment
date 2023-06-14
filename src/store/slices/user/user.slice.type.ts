import type { TLoadingStatus } from '../slices.type';

type TIsAuthenticated = 'idle' | boolean;

type TUserAuthInitState = {
  isAuthenticated: TIsAuthenticated;
  loadingStatus: TLoadingStatus;
  idInstance: string;
  apiTokenInstance: string;
  wid: string;
};

export type { TUserAuthInitState, TIsAuthenticated };
