import type { TUserAuthInitState } from './user.slice.type';

const USER_AUTH_INIT_STATE: TUserAuthInitState = {
  isAuthenticated: 'idle',
  loadingStatus: 'idle',
  username: undefined,
  email: undefined,
};

export { USER_AUTH_INIT_STATE };
