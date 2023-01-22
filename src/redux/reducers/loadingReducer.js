import {
  HIDDEN_LOADING,
  SHOW_LOADING,
} from "src/redux/constants/loadingConstants";

export const loadingInitialState = false;

export function loadingReducer(state = loadingInitialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return action.payload;
    case HIDDEN_LOADING:
      return loadingInitialState;

    default:
      return state;
  }
}
