import path from 'path';

const constructApiUrl = (base: string) => (apiVersion: string) => (urlPath: string) =>
  new URL(path.join(`api`, `${apiVersion}`, `${urlPath}`), base)[
    process.env.REACT_APP_NODE_ENV === 'production' ? 'href' : 'pathname'
  ];
const constructAssetsUrl = (base: string) => (urlPath: string) => (filename: string) =>
  new URL(path.join(`${urlPath}`, `${filename}`), base)[
    process.env.REACT_APP_NODE_ENV === 'production' ? 'href' : 'pathname'
  ];

const getApiUrl = constructApiUrl(process.env.REACT_APP_API_URL)(process.env.REACT_APP_API_VERSION);
const getAssetsUrlPartial = constructAssetsUrl(process.env.REACT_APP_API_URL);

const STATIC_ROUTES = {
  REGISTER: '/access/register',
  LOGIN: '/access/login',
  CHANGE_PASSWORD: '/access/change-password',
  LOGOUT: '/access/logout',
  AUTH_STATUS: '/access/auth-status',
  CATEGORIES: '/goods/categories',
  ENTITIES: '/goods/entitities',
  ASSETS: '/assets',
  ASSETS_RANDOM: '/assets/random',
};

const ROUTES = {
  ACCESS: {
    AUTH_STATUS: getApiUrl(STATIC_ROUTES.AUTH_STATUS),
  },
};

export { STATIC_ROUTES, ROUTES };
