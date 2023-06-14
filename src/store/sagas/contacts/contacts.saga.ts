import { all, call } from 'redux-saga/effects';
import { sideChainWatcher } from './side-chains.goods';
import { fetchContactsWatcher } from './fetch-contacts.saga';

function* contactsRootWatcher() {
  yield all([call(sideChainWatcher), call(fetchContactsWatcher)]);
}

export { contactsRootWatcher };
