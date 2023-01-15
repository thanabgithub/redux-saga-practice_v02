import { combineReducers } from "redux";
import usersReducer from "./reducer";

const rootReducer = combineReducers({
  dataUsers: usersReducer,
});

export default rootReducer;
