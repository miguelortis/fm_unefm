import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  SAVE_USER,
  RESET,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_INFO_RESET,
  USER_PROFILE_PIC_REQUEST,
  USER_PROFILE_PIC_SUCCESS,
  USER_PROFILE_PIC_FAIL,
  USER_PROFILE_PIC_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "src/redux/constants/userConstants";

export const userInitialState = {
  loadingProfilePic: false,
  successProfilePic: false,
  ProfilePicData: "",
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loadingUserLogin: true };
    case USER_LOGIN_SUCCESS:
      return {
        loadingUserLogin: false,
        successUserLogin: true,
        userToken: action.payload,
      };
    case USER_LOGIN_FAIL:
      return { loadingUserLogin: false, errorUserLogin: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      return {};
    default:
      return state;
  }
};

export const userInfoReducer = (state = { loadingUserInfo: false }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { loadingUserInfo: true };
    case USER_INFO_SUCCESS:
      return {
        loadingUserInfo: false,
        successUserInfo: true,
        currentUser: action.payload,
      };
    case USER_INFO_FAIL:
      return {
        loadingUserInfo: false,
        errorUserInfo: action.payload,
      };
    case USER_INFO_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loadingUserInfo: true };
    case USER_UPDATE_SUCCESS:
      return {
        loadingUserUpdate: false,
        successUserUpdate: true,
        updatedUserData: action.payload,
      };
    case USER_UPDATE_FAIL:
      return {
        loadingUserUpdate: false,
        errorUserUpdate: action.payload,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loadingUserList: true };
    case USER_LIST_SUCCESS:
      return {
        loadingUserList: false,
        successUserList: true,
        userListData: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        loadingUserList: false,
        errorUserList: action.payload,
      };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const userProfilePictureReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_PROFILE_PIC_REQUEST:
      return { ...state, loadingProfilePic: true };
    case USER_PROFILE_PIC_SUCCESS:
      return {
        loadingProfilePic: false,
        successProfilePic: true,
        ProfilePicData: action.payload,
      };
    case USER_PROFILE_PIC_FAIL:
      return {
        loadingProfilePic: false,
        errorProfilePic: action.payload,
      };
    case USER_PROFILE_PIC_RESET:
      return {};
    default:
      return state;
  }
};

/* export function userInfoReducer(state = userInitialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return { ...state, ...action.payload };
    case RESET:
      return userInitialState;

    default:
      return state;
  }
} */
