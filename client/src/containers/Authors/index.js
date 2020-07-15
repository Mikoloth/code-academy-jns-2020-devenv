import authorReducer from "./authorReducer";

import { injectReducer } from "redux-injector";

injectReducer("authorStore", authorReducer);

export { default } from "./Authors";
