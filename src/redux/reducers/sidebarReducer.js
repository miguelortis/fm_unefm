import { TYPES } from "src/redux/actions/sidebarAtion";

export const sidebarInitialState = {
  show: false,
  unfoldable: false,
};

export function sidebarReducer(state = sidebarInitialState, action) {
  switch (action.type) {
    case TYPES.SIDEBAR_SHOW:
      return { ...state, show: action.payload || !state.show };
    case TYPES.SIDEBAR_UNFOLDABLE:
      return { ...state, unfoldable: action.payload };
    case TYPES.RESET:
      return sidebarInitialState;

    default:
      return state;
  }
}
