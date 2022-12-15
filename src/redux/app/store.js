// import { configureStore } from "@reduxjs/toolkit";
// im

// const store = configureStore({
//     reducer:{

//     }
// })
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware , compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../component/Authentication/Login/reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// const store = createStore(rootReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;