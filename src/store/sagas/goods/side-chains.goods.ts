import { put, select, takeLatest } from 'redux-saga/effects';
import { SIDEBAR_TEMPLATE } from '../../../const';
import type { TSidebarTemplateEntity } from '../../../const/const.type';
import { uiPathnameSelector } from '../../selectors';
import {
  fetchMoreEntitiesAsync,
  pushCartEntity,
  setHasTriedPuttingEntitesToCart,
  setPathnameUi,
  setSelectedCategoryIdx,
  setSelectedModifierIdx,
  setSelectedSectionIdxUi,
} from '../../slices';

function* deriveSelectedSectionFromPathnameWorker(action: { type: string }) {
  const pathname = (yield select(uiPathnameSelector)) as string;

  const templateOccurenceIdx = (
    SIDEBAR_TEMPLATE as Exclude<TSidebarTemplateEntity[], undefined>
  ).findIndex((_) => _.pathname === pathname);

  yield put(
    setSelectedSectionIdxUi({
      sectionIdx: SIDEBAR_TEMPLATE[templateOccurenceIdx] === undefined ? -1 : templateOccurenceIdx,
    }),
  );
}

function* fetchOnParamsChangeWorker(action: { type: string }) {
  // here can prevent fetching for specific categories/modifiers
  yield put(fetchMoreEntitiesAsync());
}

function* switchGuideHasTriedPuttingEntitesToCartWorker(action: { type: string }) {
  yield put(setHasTriedPuttingEntitesToCart(true));
}

function* sideChainWatcher() {
  yield takeLatest([setPathnameUi], deriveSelectedSectionFromPathnameWorker);
  yield takeLatest([setSelectedCategoryIdx, setSelectedModifierIdx], fetchOnParamsChangeWorker);
  yield takeLatest([pushCartEntity], switchGuideHasTriedPuttingEntitesToCartWorker);
}

export { sideChainWatcher };
