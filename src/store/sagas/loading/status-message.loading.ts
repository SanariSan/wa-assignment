import { put, takeEvery } from 'redux-saga/effects';
import {
  setCategoriesLoadStatus,
  setEntitiesLoadStatus,
  setErrorMessageUi,
  setSuccessMessageUi,
  setUserAuthLoadStatus,
} from '../../slices';
import type { TLoadingStatus } from '../../slices/slices.type';

function* statusMessageWorker(action: {
  payload: { status: TLoadingStatus; message?: string };
  type: string;
}) {
  if (action.payload.status === 'failure') {
    yield put(
      setErrorMessageUi({
        title: 'Error',
        description: action.payload.message,
      }),
    );
  }

  if (action.payload.status === 'success') {
    yield put(
      setSuccessMessageUi({
        title: 'Success',
        description: action.payload.message,
      }),
    );
  }
}

function* loadingStatusWatcher() {
  yield takeEvery(setUserAuthLoadStatus, statusMessageWorker);
  yield takeEvery(setEntitiesLoadStatus, statusMessageWorker);
  yield takeEvery(setCategoriesLoadStatus, statusMessageWorker);
}

export { loadingStatusWatcher };
