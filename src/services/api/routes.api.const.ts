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
const getAssetsUrl = getAssetsUrlPartial(process.env.REACT_APP_API_URL);

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
    REGISTER: getApiUrl(STATIC_ROUTES.REGISTER),
    LOGIN: getApiUrl(STATIC_ROUTES.LOGIN),
    CHANGE_PASSWORD: getApiUrl(STATIC_ROUTES.CHANGE_PASSWORD),
    LOGOUT: getApiUrl(STATIC_ROUTES.LOGOUT),
    AUTH_STATUS: getApiUrl(STATIC_ROUTES.AUTH_STATUS),
  },
  GOODS: {
    CATEGORIES: getApiUrl(STATIC_ROUTES.CATEGORIES),
    ENTITIES: getApiUrl(STATIC_ROUTES.ENTITIES),
  },
  ASSETS: {
    ASSETS: getAssetsUrlPartial(STATIC_ROUTES.ASSETS),
    ASSETS_RANDOM: getAssetsUrlPartial(STATIC_ROUTES.ASSETS_RANDOM),
  },
};

const ASSETS = {
  PFP: ROUTES.ASSETS.ASSETS_RANDOM('pfp.webp'),
  PFP_GH: ROUTES.ASSETS.ASSETS_RANDOM('pfp_gh.webp'),
  HINT: ROUTES.ASSETS.ASSETS_RANDOM('hint.webp'),
  ATOM: ROUTES.ASSETS.ASSETS_RANDOM('atom.webp'),
  CHAKRA: ROUTES.ASSETS.ASSETS_RANDOM('chakra.webp'),
  DOCKER: ROUTES.ASSETS.ASSETS_RANDOM('docker.webp'),
  GH: ROUTES.ASSETS.ASSETS_RANDOM('gh.webp'),
  LINT: ROUTES.ASSETS.ASSETS_RANDOM('lint.webp'),
  NGINX: ROUTES.ASSETS.ASSETS_RANDOM('nginx.webp'),
  NODE: ROUTES.ASSETS.ASSETS_RANDOM('node.webp'),
  PG: ROUTES.ASSETS.ASSETS_RANDOM('pg.webp'),
  REDIS: ROUTES.ASSETS.ASSETS_RANDOM('redis.webp'),
  SAGA: ROUTES.ASSETS.ASSETS_RANDOM('redux-saga.webp'),
  REDUX: ROUTES.ASSETS.ASSETS_RANDOM('redux.webp'),
  TS: ROUTES.ASSETS.ASSETS_RANDOM('ts.webp'),
  PEPE: ROUTES.ASSETS.ASSETS_RANDOM('no4.webp'),
  CROSS: ROUTES.ASSETS.ASSETS_RANDOM('cross.webp'),
  ANN: ROUTES.ASSETS.ASSETS_RANDOM('no3.webp'),
};

export { STATIC_ROUTES, ROUTES, ASSETS };
