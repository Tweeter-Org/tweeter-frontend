import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import BaseUrl from "./BaseUrl";

const accessToken = localStorage.getItem("access token")
const config = {
    headers:{
        "Authorization" :`Bearer ${accessToken}`
    }
}

function ProfileAction (username){
    return async function (dispatch){
        dispatch({
            type:"VIEW_PROFILE",
        })
        await BaseUrl.get(`/p/${username}`,config)
        .then((res)=>{
            dispatch({
                type:"VIEW_PROFILE_SUCCED",
                payload:res
            })
        })
        .catch((err)=>{
            dispatch({
                type:"VIEW_PROFILE_FAIL",
                payload:err
            })
        })
    }
}

export default ProfileAction