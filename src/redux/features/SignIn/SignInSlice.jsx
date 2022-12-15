import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    email:"",
    password:""
}

const SignInUser = createAsyncThunk("user/SignInUser",()=>{
    
})
// export SignInUser