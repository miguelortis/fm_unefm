import { HIDDEN_LOADING, SHOW_LOADING } from "../constants/loadingConstants";

/**
 *
 * @param {object} props
 * @description type boolean: true or false
 * @returns loading component
 */
export const showLoading = (props) => async (dispatch) => {
  if (props) {
    dispatch({ type: SHOW_LOADING, payload: props });
  } else {
    dispatch({ type: HIDDEN_LOADING });
  }
};
