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
  deleteUserSuccess,
  deleteUserError,
} from "./actions";
import * as types from "./actionTypes";
import { loadUsersApi, createUserApi, deleteUserApi } from "./api";

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
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess());
    }
  } catch (e) {
    yield put(createUserError(e));
  }
}

function* onDeleteUserStartAsync({ payload }) {
  try {
    const response = yield call(deleteUserApi, payload);
    if (response.status === 200) {
      yield put(deleteUserSuccess());
    }
  } catch (e) {
    yield put(deleteUserError(e));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(onDeleteUser)];

function* rootSaga() {
  yield all([...userSagas]);
}

export default rootSaga;
