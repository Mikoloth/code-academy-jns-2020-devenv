import userReducer from "./userReducer";

import store from "../../store";

store.injectReducer("userStore", userReducer);

export { default } from "./Users";
