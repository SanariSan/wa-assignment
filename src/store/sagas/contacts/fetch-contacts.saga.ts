import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../../general.type';
import type { TSafeReturn } from '../../../helpers/sagas';
import { safe } from '../../../helpers/sagas';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import { validateDTO } from '../../../services/api';
import { fetchChatHistoryAsync, setContactsLoadStatus } from '../../slices';

// function* fetchChatHistoryWorker(action: { payload: { id: string }; type: string }) {
//   const abortController = new AbortController();
//   try {
//     yield put(setContactsLoadStatus({ status: 'loading' }));

//     // we received phone OR group | 71234567891 / 123-42342312
//     // ^\+?(?<phone>\d+)$
//     // ^(?<group>\d+-\d+)$

//     const appendedPayload = `${action.payload.id}@c.us`;

//     const validateStatus = (yield safe(
//       call(validateDTO, {
//         schema: ContactsFetchChatHistoryOutgoingDTO,
//         value: appendedPayload,
//       }),
//     )) as TSafeReturn<TContactsFetchChatHistoryOutgoingFields>;

//     if (validateStatus.error !== undefined) {
//       yield put(setContactsLoadStatus({ status: 'failure' }));
//       return;
//     }

//     const fetchStatus = (yield safe(
//       call(fetchContact, {
//         dto: validateStatus.response,
//         abortSignal: abortController.signal,
//       }),
//     )) as TSafeReturn<{
//       success?: TAccessCheckSessionIncomingSuccessFields;
//       failure?: TAccessCheckSessionIncomingFailureFields;
//     }>;

//     publishLog(ELOG_LEVEL.DEBUG, fetchStatus);

//     if (fetchStatus.error !== undefined) {
//       yield put(
//         setContactsLoadStatus({ status: 'failure', message: String(fetchStatus.error.message) }),
//       );
//       return;
//     }

//     if (fetchStatus.response.success !== undefined) {
//       yield put(
//         setContactsLoadStatus({ status: 'success', message: 'User added to your contacts list!' }),
//       );
//       return;
//     }

//     if (fetchStatus.response.failure !== undefined) {
//       yield put(
//         setContactsLoadStatus({
//           status: 'failure',
//           message: String(fetchStatus.response.failure.detail),
//         }),
//       );
//       return;
//     }
//   } finally {
//     if ((yield cancelled()) as boolean) {
//       abortController.abort();
//     }
//   }
// }

function* fetchContactsWatcher() {
  // yield takeLatest([fetchChatHistoryAsync], fetchChatHistoryWorker);
}

export { fetchContactsWatcher };
