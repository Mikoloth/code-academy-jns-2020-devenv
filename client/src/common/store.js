import { applyMiddleware } from "redux";
import { createInjectStore } from "redux-injector";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import loader from "./reducers/loaderReducer";

const reducers = {
  loader,
};

const logger = createLogger({
  collapsed: true,
});

const store_middleware = applyMiddleware(promise, thunk, logger);

export default createInjectStore(reducers, store_middleware);
