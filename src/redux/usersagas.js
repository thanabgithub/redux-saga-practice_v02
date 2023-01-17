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
  searchUserSuccess,
  searchUserError,
  filterUserSuccess,
  filterUserError,
} from "./actions";
import * as types from "./actionTypes";
import {
  createUserApi,
  loadUsersApi,
  updateUserApi,
  deleteUserApi,
  searchUserApi,
  filterUserApi,
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
      yield delay(100);
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
function* onDeleteUserStartAsync({ payload: userId }) {
  try {
    const response = yield call(deleteUserApi, userId);

    if (response.status === 200) {
      yield put(deleteUserSuccess());
    }
  } catch (e) {
    yield put(deleteUserError(e));
  }
}

function* onSearchUserStartAsync({ payload: query }) {
  try {
    const response = yield call(searchUserApi, query);

    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (e) {
    yield put(searchUserError(e));
  }
}

function* onFilterUserStartAsync({ payload }) {
  try {
    const response = yield call(filterUserApi, payload);

    if (response.status === 200) {
      yield put(filterUserSuccess(response.data));
    }
  } catch (e) {
    yield put(filterUserError(e));
  }
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}
function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}
function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}
function* onDeleteUser() {
  yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
}
function* onSearchUser() {
  yield takeEvery(types.SEARCH_USER_START, onSearchUserStartAsync);
}
function* onFilterUser() {
  yield takeLatest(types.FILTER_USER_START, onFilterUserStartAsync);
}
const userSagas = [
  fork(onCreateUser),
  fork(onLoadUsers),
  fork(onUpdateUser),
  fork(onDeleteUser),
  fork(onSearchUser),
  fork(onFilterUser),
];

function* rootSaga() {
  yield all([...userSagas]);
}

export default rootSaga;
