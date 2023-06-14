const DEFAULT_FETCH_HEADERS: HeadersInit = {
  // Connection: 'keep-alive',
  'Content-Type': 'application/json',
  'X-DEV-TAG': (process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_TAG
    : undefined) as string,
};

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  method: 'GET',
  redirect: 'manual',
  credentials: 'include',
};

export { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS };
