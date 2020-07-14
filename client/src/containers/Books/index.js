import bookReducer from "./bookReducer";

import { injectReducer } from "redux-injector";

injectReducer("bookStore", bookReducer);

export { default } from "./Books";
