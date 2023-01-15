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

import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
} from "./actions";
import * as types from "./actionTypes";
import { loadUsersApi, createUsersApi } from "./api";

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

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUsersApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess());
    }
  } catch (e) {
    yield put(createUserError(e));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser)];

function* rootSaga() {
  yield all([...userSagas]);
}

// export { onLoadUsersStartAsync, onLoadUsers };
export default rootSaga;
