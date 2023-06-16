import path from 'path';

const constructApiUrl = (base: string) => (urlPath: string) =>
  new URL(path.join(`${urlPath}`), base).href;
const getApiUrl = constructApiUrl(process.env.REACT_APP_API_URL);

type TAuthParamsBase = {
  idInstance: string;
  apiTokenInstance: string;
};

const GET_ROUTE = {
  CHECK_SESSION: ({ idInstance, apiTokenInstance }: TAuthParamsBase) =>
    getApiUrl(`/waInstance${idInstance}/getSettings/${apiTokenInstance}`),
  FETCH_HISTORY: ({ idInstance, apiTokenInstance }: TAuthParamsBase) =>
    getApiUrl(`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`),
  RECEIVE_UPDATE: ({ idInstance, apiTokenInstance }: TAuthParamsBase) =>
    getApiUrl(`/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`),
  SEND_MESSAGE: ({ idInstance, apiTokenInstance }: TAuthParamsBase) =>
    getApiUrl(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`),
  AKNOWLEDGE_UPDATE: ({
    idInstance,
    apiTokenInstance,
    receiptId,
  }: TAuthParamsBase & { receiptId: number }) =>
    getApiUrl(`/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`),
};

export { GET_ROUTE };
