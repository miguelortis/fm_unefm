import { combineReducers, createStore } from "redux";
import { userReducer } from "./redux/reducers/userReducer";
import { sidebarReducer } from "./redux/reducers/sidebarReducer";
import { modalReducer } from "./redux/reducers/modalReducer";
import { loadingReducer } from "./redux/reducers/loadingReducer";

const reducers = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
  showModal: modalReducer,
  loading: loadingReducer,
});

const store = createStore(reducers);
export default store;
