import Request from "src/utils/Request";
import {
  ROLE_LIST_FAIL,
  ROLE_LIST_REQUEST,
  ROLE_LIST_RESET,
  ROLE_LIST_SUCCESS,
  ROLE_REGISTER_FAIL,
  ROLE_REGISTER_REQUEST,
  ROLE_REGISTER_SUCCESS,
  ROLE_USER_BY_ID_FAIL,
  ROLE_USER_BY_ID_REQUEST,
  ROLE_USER_BY_ID_RESET,
  ROLE_USER_BY_ID_SUCCESS,
} from "../constants/roleConstants";

export const registerRoler = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: ROLE_REGISTER_REQUEST });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await Request.post(`/roles`, roleData, config);
    console.log(res);
    dispatch({ type: ROLE_REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ROLE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRoleList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ROLE_LIST_REQUEST });

    /* const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }; */
    const { data } = await Request.get(`/roles`);
    dispatch({ type: ROLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    //if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
    //localStorage.removeItem("token");
    dispatch({
      type: ROLE_LIST_RESET,
    });
    // window.location.href = `/login`;
    // }
    dispatch({
      type: ROLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRoleUserById = (userId) => async (dispatch, getState) => {
  const { user } = getState();
  if (!userId) {
    userId = user.currentUser.user._id;
  }
  try {
    dispatch({ type: ROLE_USER_BY_ID_REQUEST });

    const { data } = await Request.get(`/roles/${userId}`);
    dispatch({ type: ROLE_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      dispatch({
        type: ROLE_USER_BY_ID_RESET,
      });
      window.location.href = `/login`;
    }
    dispatch({
      type: ROLE_USER_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/**
 *
 * @param {*} userId
 * @param {*} body
 * @returns
 */
/* export const userUpdate = (body, userId) => async (dispatch, getState) => {
  const { user } = getState();
  console.log(user.currentUser.user);
  if (!userId) {
    userId = user.currentUser.user._id;
  }
  try {
    dispatch({ type: USER_INFO_REQUEST });

    const { data } = await Request.put(`/users/${userId}`, body);

    dispatch({ type: USER_INFO_SUCCESS, payload: data.content });
    console.log(data);
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      dispatch({
        type: USER_LOGOUT,
      });
      window.location.href = `/login`;
    }
    dispatch({
      type: USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; */
/**
 *
 * @param {*} userId
 * @param {*} body
 * @returns
 */
/* export const getProfilePic = (userId) => async (dispatch, getState) => {
  const { user } = getState();
  if (!userId) {
    userId = user.currentUser?._id;
  }
  try {
    dispatch({ type: USER_PROFILE_PIC_REQUEST });

    const { data } = await Request.get(`/users/profile-picture/${userId}`);

    
    dispatch({ type: USER_PROFILE_PIC_SUCCESS, payload: data.content });
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      dispatch({
        type: USER_LOGOUT,
      });
      window.location.href = `/login`;
    }
    dispatch({
      type: USER_PROFILE_PIC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; */
/**
 *
 * @param {*} body
 * @param {*} userId
 * @returns
 */
/* export const updateProfilePicture =
  (profilePic, userId) => async (dispatch, getState) => {
    const { user } = getState();
    if (!userId) {
      userId = user.currentUser._id;
    }
    try {
      dispatch({ type: USER_PROFILE_PIC_REQUEST });

      const { data } = await Request.put(
        `/users/profile-picture/${userId}`,
        profilePic
      );

    

      dispatch({
        type: USER_PROFILE_PIC_SUCCESS,
        payload: data.content,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
        localStorage.removeItem("token");
        dispatch({
          type: USER_LOGOUT,
        });
        window.location.href = `/login`;
      }
      dispatch({
        type: USER_PROFILE_PIC_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }; */

/* export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
}; */
