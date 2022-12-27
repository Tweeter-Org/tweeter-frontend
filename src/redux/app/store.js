import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/SignIn/SignInSlice"

const store = configureStore({
    reducer:{
        logIn:loginReducer
    },
    devTools:{
        
    }
})

// const store = createStore(rootReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;