import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  SAVE_USER,
  RESET,
} from "src/redux/constants/userConstants";

export const userInitialState = null;

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loadingUserInfo: true };
    case USER_LOGIN_SUCCESS:
      return {
        loadingUserInfo: false,
        userInfo: action.payload,
        successUserInfo: true,
      };
    case USER_LOGIN_FAIL:
      return { loadingUserInfo: false, errorUserInfo: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      return {};
    default:
      return state;
  }
};

export function userInfoReducer(state = userInitialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return { ...state, ...action.payload };
    case RESET:
      return userInitialState;

    default:
      return state;
  }
}
