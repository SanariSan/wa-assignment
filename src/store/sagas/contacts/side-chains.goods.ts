import { put, takeLatest } from 'redux-saga/effects';

// function* switchGuideHasTriedPuttingEntitesToCartWorker(action: { type: string }) {
//   yield put(setHasTriedPuttingEntitesToCart(true));
// }

function* sideChainWatcher() {
  // yield takeLatest([pushCartEntity], switchGuideHasTriedPuttingEntitesToCartWorker);
}

export { sideChainWatcher };
