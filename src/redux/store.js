import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import Config from "../config/Config";
import rootSaga from "./usersagas";

const sagaMiddleware = createSagaMiddleware();

var middlewares = [sagaMiddleware];

if (Config.nodeEnv === "development") {
  middlewares = [...middlewares, logger];
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
export default store;
