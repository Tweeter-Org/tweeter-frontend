import React from "react";
import BaseUrl from "./BaseUrl";

const accessToken = localStorage.getItem("access token")
const config = {
    headers:{
        "Authorization" :`Bearer ${accessToken}`
    }
}

function FollowAction (username){
    return async function (dispatch){
        dispatch({
            type:"FOLLOW_START",
        })
        await BaseUrl.put(`/p/follow/${username}`,{username},config)
        .then((res)=>{
            dispatch({
                type:"FOLLOW_SUCCESS",
                payload:res
            })
        })
        .catch((err)=>{
            dispatch({
                type:"FOLLOW_FAILED",
                payload:err
            })
        })
    }
}
export default FollowAction
