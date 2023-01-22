import Request from "src/utils/Request";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_PROFILE_PIC_REQUEST,
  USER_PROFILE_PIC_SUCCESS,
  USER_PROFILE_PIC_FAIL,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from "src/redux/constants/userConstants";
import axios from "axios";
/////////////

export const userlogin = (idCard, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const res = await Request.post(`/auth/login`, {
      idCard,
      password,
    });

    /* const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    } */

    localStorage.setItem("token", res.data.token);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.token });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userInfo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_INFO_REQUEST });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_TEST_URL}/auth/user`,
      config
    );

    /* const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    } */

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
};
/**
 *
 * @param {*} userId
 * @param {*} body
 * @returns
 */
export const userUpdate = (body, userId) => async (dispatch, getState) => {
  const { user } = getState();
  if (!userId) {
    userId = user.currentUser.user._id;
  }
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { data } = await Request.put(`/users/${userId}`, body);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.content });
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
      type: USER_UPDATE_FAIL,
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
export const getProfilePic = (userId) => async (dispatch, getState) => {
  const { user } = getState();
  if (!userId) {
    userId = user.currentUser?._id;
  }
  try {
    dispatch({ type: USER_PROFILE_PIC_REQUEST });

    const { data } = await Request.get(`/users/profile-picture/${userId}`);

    /* const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    } */

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
};
/**
 *
 * @param {*} userId
 * @param {*} body
 * @returns
 */
export const getUserList = () => async (dispatch, getState) => {
  const { user } = getState();
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await Request.get(`/users`);

    /* const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    } */

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      dispatch({
        type: USER_LIST_RESET,
      });
      window.location.href = `/login`;
    }
  }
};
/**
 *
 * @param {*} body
 * @param {*} userId
 * @returns
 */
export const updateProfilePicture =
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

      /* const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    } */

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
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
