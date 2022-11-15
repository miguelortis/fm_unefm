import Request from "src/utils/Request";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "src/redux/constants/userConstants";
import axios from "axios";
/////////////

export const userlogin = (idCard, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      `${process.env.REACT_APP_TEST_URL}/auth/login`,
      {
        idCard,
        password,
      }
    );

    /* const decoded = parseJwt(data.token)
    const userSession = {
      ...decoded,
      token: data.token,
    } */

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });

    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
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
