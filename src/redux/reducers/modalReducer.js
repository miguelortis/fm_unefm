import { HIDDEN_MODAL, SHOW_MODAL } from "src/redux/constants/modalConstants";

export const modalInitialState = {
  title: "",
  open: false,
  content: null,
};

export function modalReducer(state = modalInitialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, ...action.payload };
    case HIDDEN_MODAL:
      return modalInitialState;

    default:
      return state;
  }
}
