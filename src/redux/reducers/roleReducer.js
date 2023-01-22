import {
  ROLE_LIST_FAIL,
  ROLE_LIST_REQUEST,
  ROLE_LIST_RESET,
  ROLE_LIST_SUCCESS,
  ROLE_REGISTER_FAIL,
  ROLE_REGISTER_REQUEST,
  ROLE_REGISTER_RESET,
  ROLE_REGISTER_SUCCESS,
  ROLE_USER_BY_ID_FAIL,
  ROLE_USER_BY_ID_REQUEST,
  ROLE_USER_BY_ID_RESET,
  ROLE_USER_BY_ID_SUCCESS,
} from "../constants/roleConstants";

export const userInitialState = {
  loadingProfilePic: false,
  successProfilePic: false,
  ProfilePicData: "",
};

export const roleRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_REGISTER_REQUEST:
      return { loadingRoleRegister: true };
    case ROLE_REGISTER_SUCCESS:
      return {
        loadingRoleRegister: false,
        successRoleRegister: true,
        roleRegister: action.payload,
      };
    case ROLE_REGISTER_FAIL:
      return { loadingRoleRegister: false, errorRoleRegister: action.payload };
    case ROLE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const getRoleListReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_LIST_REQUEST:
      return { loadingRoleList: true };
    case ROLE_LIST_SUCCESS:
      return {
        loadingRoleList: false,
        successRoleList: true,
        roleList: action.payload,
      };
    case ROLE_LIST_FAIL:
      return {
        loadingRoleList: false,
        errorRoleList: action.payload,
      };
    case ROLE_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const getRoleUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ROLE_USER_BY_ID_REQUEST:
      return { loadingRoleUserById: true };
    case ROLE_USER_BY_ID_SUCCESS:
      return {
        loadingRoleUserById: false,
        successRoleUserById: true,
        roleUserById: action.payload,
      };
    case ROLE_USER_BY_ID_FAIL:
      return {
        loadingRoleUserById: false,
        errorRoleUserById: action.payload,
      };
    case ROLE_USER_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

/*export const updateRoleReducer = (state = userInitialState, action) => {
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

export const deleteRoleReducer = (state = userInitialState, action) => {
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
}; */
