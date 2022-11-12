import { TYPES } from "src/redux/actions/userAction";

export const userInitialState = null;

export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case TYPES.SAVE_USER:
      return { ...state, ...action.payload };
    case TYPES.RESET:
      return userInitialState;

    default:
      return state;
  }
}
