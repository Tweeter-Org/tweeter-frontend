import { legacy_createStore as createStore } from "redux";
import { applyMiddleware , compose } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import localStorage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistconfig ={
    key:"root",
    storage: localStorage,
    blacklist: ['TweetFeedReducer']
}

const persistreducer = persistReducer(persistconfig, rootReducer)
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
const store = createStore(persistreducer,composeEnhancers(applyMiddleware(thunk)))
const persiststore = persistStore(store)

export default store;
export {persiststore}