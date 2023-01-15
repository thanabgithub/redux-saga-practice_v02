import * as types from "./actionTypes";

const loadUsersStart = () => ({
  type: types.LOAD_USERS_START,
});

const loadUsersSuccess = (users) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: users,
});

const loadUsersError = (error) => ({
  type: types.LOAD_USERS_ERROR,
  payload: error,
});

const createUserStart = (user) => ({
  type: types.CREATE_USER_START,
  payload: user,
});

const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});

const createUserError = (error) => ({
  type: types.CREATE_USER_ERROR,
  payload: error,
});

export { loadUsersStart, loadUsersSuccess, loadUsersError };
export { createUserStart, createUserSuccess, createUserError };
