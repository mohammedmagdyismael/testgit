import { fork } from 'redux-saga/effects';
import actionsSaga from './actions';

const sagas = [
  actionsSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
