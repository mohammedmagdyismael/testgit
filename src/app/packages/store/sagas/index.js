import { fork } from 'redux-saga/effects';
import actionsSaga from './accounts';

const sagas = [
  actionsSaga
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
