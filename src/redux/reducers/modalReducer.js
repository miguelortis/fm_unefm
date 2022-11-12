import { TYPES } from "src/redux/actions/modalAction";

export const modalInitialState = {
  title: "",
  open: false,
  content: null,
};

export function modalReducer(state = modalInitialState, action) {
  switch (action.type) {
    case TYPES.SHOW_MODAL:
      return { ...state, ...action.payload };
    case TYPES.HIDDEN_MODAL:
      return modalInitialState;
    case TYPES.RESET:
      return modalInitialState;

    default:
      return state;
  }
}
