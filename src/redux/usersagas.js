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
  createUserSuccess,
  createUserError,
  loadUsersSuccess,
  loadUsersError,
  updateUserSuccess,
  updateUserError,
  deleteUserSuccess,
  deleteUserError,
} from "./actions";
import * as types from "./actionTypes";
import {
  createUserApi,
  loadUsersApi,
  updateUserApi,
  deleteUserApi,
} from "./api";

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess());
    }
  } catch (e) {
    yield put(createUserError(e));
  }
}

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);

    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(loadUsersError(e));
  }
}

function* onUpdateUserStartAsync({ payload }) {
  try {
    const { id, formValue } = payload;
    const response = yield call(updateUserApi, id, formValue);

    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (e) {
    yield put(updateUserError(e));
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
function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}
function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onDeleteUser() {
  yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}

const userSagas = [
  fork(onCreateUser),
  fork(onUpdateUser),
  fork(onLoadUsers),
  fork(onDeleteUser),
];

function* rootSaga() {
  yield all([...userSagas]);
}

export default rootSaga;
