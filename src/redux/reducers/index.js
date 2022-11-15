import { combineReducers } from "redux";

import { userInfoReducer, userLoginReducer } from "./userReducer";
import { sidebarReducer } from "./sidebarReducer";
import { modalReducer } from "./modalReducer";
import { loadingReducer } from "./loadingReducer";

export default combineReducers({
  userAuth: userLoginReducer,
  user: userInfoReducer,
  sidebar: sidebarReducer,
  showModal: modalReducer,
  loading: loadingReducer,
});
