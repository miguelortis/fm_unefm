import { TYPES } from "src/actions/modalAction";

export const modalInitialState = {
    title: '',
    open: false,
    content: null
}

export function modalReducer(state = modalInitialState, action) {
console.log(action.payload, action.type)
    switch (action.type) {
        case TYPES.SHOW_MODAL:
          return {...state, ...action.payload};
        case TYPES.RESET:
          return modalInitialState;
    
        default:
          return state;
    }
    
}