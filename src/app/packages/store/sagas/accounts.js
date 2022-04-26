import { takeEvery, put } from 'redux-saga/effects';
// import { API, STATUS, Urls } from '@vezeeta/web-utils';

import { ACCOUNTS } from '../actions/actions';

function* setInfo(payload) {
  /* const { getAccountHeader } = payload;
  const basicInfo = new API();
  const getUserBasicInfo = yield basicInfo.get(Urls.account.getAccount, getAccountHeader);
  if (STATUS.isSuccess(getUserBasicInfo.status)) {
    yield put({
      type: ACCOUNTS.BASICINFO.SUCCEEDED,
      userBasicInfo: getUserBasicInfo.data,
      accountKey: getAccountHeader[0].value,
    });
  } else {
    yield put({
      type: ACCOUNTS.BASICINFO.FAILED,
    });
  } */
}

export default function* actionsSaga() {
  yield takeEvery(ACCOUNTS.SET_INFO, setInfo);
}
