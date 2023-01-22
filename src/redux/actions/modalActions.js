import { HIDDEN_MODAL, SHOW_MODAL } from "../constants/modalConstants";

/**
 *
 * @param {object} props
 * @description { open: boolean, title: string, content: node }
 * @returns Modal component
 */
export const showModal = (props) => async (dispatch) => {
  if (props?.open) {
    dispatch({ type: SHOW_MODAL, payload: props });
  } else {
    dispatch({ type: HIDDEN_MODAL });
  }
};
