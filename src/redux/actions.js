import * as types from "./actionTypes";

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

const updateUserStart = (userInfo) => ({
  type: types.UPDATE_USER_START,
  payload: userInfo,
});

const updateUserSuccess = () => ({
  type: types.UPDATE_USER_SUCCESS,
});

const updateUserError = (error) => ({
  type: types.UPDATE_USER_ERROR,
  payload: error,
});

const deleteUserStart = (userId) => ({
  type: types.DELETE_USER_START,
  payload: userId,
});

const deleteUserSuccess = () => ({
  type: types.DELETE_USER_SUCCESS,
});

const deleteUserError = (error) => ({
  type: types.DELETE_USER_ERROR,
  payload: error,
});

const searchUserStart = (query) => ({
  type: types.SEARCH_USER_START,
  payload: query,
});

const searchUserSuccess = (users) => ({
  type: types.SEARCH_USER_SUCCESS,
  payload: users,
});

const searchUserError = (error) => ({
  type: types.SEARCH_USER_ERROR,
  payload: error,
});

export { createUserStart, createUserSuccess, createUserError };
export { loadUsersStart, loadUsersSuccess, loadUsersError };
export { updateUserStart, updateUserSuccess, updateUserError };
export { deleteUserStart, deleteUserSuccess, deleteUserError };

export { searchUserStart, searchUserSuccess, searchUserError };
