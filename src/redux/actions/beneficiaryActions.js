import Request from "src/utils/Request";
import {
  BENEFICIARY_LIST_FAIL,
  BENEFICIARY_LIST_REQUEST,
  BENEFICIARY_LIST_RESET,
  BENEFICIARY_LIST_SUCCESS,
} from "../constants/beneficiaryConstants";

export const getBeneficiaryList = () => async (dispatch, getState) => {
  const { user } = getState();
  try {
    dispatch({ type: BENEFICIARY_LIST_REQUEST });

    const { data } = await Request.get(`/beneficiaries`);

    dispatch({ type: BENEFICIARY_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BENEFICIARY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error?.response?.status === 401 && !!localStorage.getItem("token")) {
      localStorage.removeItem("token");
      dispatch({
        type: BENEFICIARY_LIST_RESET,
      });
      window.location.href = `/login`;
    }
  }
};
