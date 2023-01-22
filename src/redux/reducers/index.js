import { combineReducers } from "redux";
import { USER_LOGOUT } from "../constants/userConstants";

import {
  userProfilePictureReducer,
  userInfoReducer,
  userLoginReducer,
  userListReducer,
  userUpdateReducer,
} from "./userReducer";

import { sidebarReducer } from "./sidebarReducer";

import { modalReducer } from "./modalReducer";

import { loadingReducer } from "./loadingReducer";

import {
  getRoleListReducer,
  getRoleUserByIdReducer,
  roleRegisterReducer,
} from "./roleReducer";
import { beneficiaryListReducer } from "./beneficiaryReducer";

const appReducer = combineReducers({
  userAuth: userLoginReducer,
  user: userInfoReducer,
  beneficiaryList: beneficiaryListReducer,
  updatedUserData: userUpdateReducer,
  userList: userListReducer,
  sidebar: sidebarReducer,
  registeredRoleData: roleRegisterReducer,
  roleList: getRoleListReducer,
  roleUserById: getRoleUserByIdReducer,
  profilePic: userProfilePictureReducer,
  modal: modalReducer,
});

export default (state, action) => {
  if (action.type === USER_LOGOUT) {
    localStorage.removeItem("token");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
