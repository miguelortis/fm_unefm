import { combineReducers, createStore } from 'redux'
import { userReducer } from './reducers/userReducer'
import { sidebarReducer } from './reducers/sidebarReducer'
import { modalReducer } from './reducers/modalReducer'
import { loadingReducer } from './reducers/loadingReducer'

const reducers = combineReducers({
 user: userReducer,
 sidebar: sidebarReducer,
 showModal: modalReducer,
 loading: loadingReducer,
})

const store = createStore(reducers)
export default store
