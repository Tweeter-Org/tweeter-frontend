import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
   loading:false,
   response:"",
   error:""
}

//action
const SignInUser = createAsyncThunk("login/SignInUser",(data)=>{
    // if(isAuthEmail){
       const api = axios.post("https://twitterbackend-production-93ac.up.railway.app/login",data)
    //    .then((res)=>{
    //     return res;
    //    })
    //    .catch((err)=>{
    //     // return err;
    //    })
        return api;
    // }
})

// builder to listen to changes to action 
// action.payload = return from action
const loginSlice = createSlice({
    name:"login",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(SignInUser.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(SignInUser.fulfilled, function(state, action){
            return (
                state.loading = false,
                state.response = action.payload.data.msg,
                state.error = ""
            )
            // return state;
        })
        builder.addCase(SignInUser.rejected,(state,action)=>{
            return (
                state.loading = false,
                state.response = "",
                state.error = "failed"
            )
        })
    },
})

export default loginSlice.reducer
export {SignInUser}
