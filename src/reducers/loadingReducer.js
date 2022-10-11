import { TYPES } from "src/actions/loadingAction";

export const loadingInitialState = false

export function loadingReducer(state = loadingInitialState, action) {

    switch (action.type) {
        case TYPES.SHOW_LOADING:
            return action.payload;
        case TYPES.RESET:
            return loadingInitialState;
    
        default:
            return state;
    }
    
}