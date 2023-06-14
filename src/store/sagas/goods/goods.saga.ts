import { all, call } from 'redux-saga/effects';
import { categoriesWatcher } from './categories.goods';
import { entitiesWatcher } from './entities.goods';
import { sideChainWatcher } from './side-chains.goods';

function* goodsRootWatcher() {
  yield all([call(sideChainWatcher), call(categoriesWatcher), call(entitiesWatcher)]);
}

export { goodsRootWatcher };
