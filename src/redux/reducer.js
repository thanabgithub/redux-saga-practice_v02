import * as types from "./actionTypes";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_USER_START:
    case types.LOAD_USERS_START:
    case types.UPDATE_USER_START:
    case types.DELETE_USER_START:
    case types.SEARCH_USER_START:
    case types.FILTER_USER_START:
    case types.SORT_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOAD_USERS_SUCCESS:
    case types.SEARCH_USER_SUCCESS:
    case types.FILTER_USER_SUCCESS:
    case types.SORT_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case types.CREATE_USER_ERROR:
    case types.LOAD_USERS_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.SEARCH_USER_ERROR:
    case types.FILTER_USER_ERROR:
    case types.SORT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case types.CREATE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
