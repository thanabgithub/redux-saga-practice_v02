import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import { loadUsersSuccess, loadUsersError } from "./actions";
import * as types from "./actionTypes";
import { loadUsersApi } from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(1000);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(loadUsersError(e));
  }
}

function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

const userSagas = [fork(onLoadUsers)];

function* rootSaga() {
  yield all([...userSagas]);
}

// export { onLoadUsersStartAsync, onLoadUsers };
export default rootSaga;
