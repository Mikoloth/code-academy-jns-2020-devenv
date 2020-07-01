import userReducer from "./userReducer";

import { injectReducer } from "redux-injector";

injectReducer("userStore", userReducer);

export { default } from "./Users";