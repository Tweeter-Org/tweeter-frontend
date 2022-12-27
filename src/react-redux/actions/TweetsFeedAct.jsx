import axios from "axios";
import React from "react";
import BaseUrl from "./BaseUrl";

const accessToken = localStorage.getItem("access token")
const config = {
    headers:{
        "Authorization" :`Bearer ${accessToken}`
    }
}

export const TweetFeedAction =()=>{
    return async function (dispatch){
        dispatch({
            type:"Tweet_Feed_Started",
            payload:""
        })
        await BaseUrl.get("/t/feed?page=0",config)
        .then((res)=>{
            dispatch({
                type:"Tweet_Feed_Succeed",
                payload:res
            })
        })
        .catch((err)=>{
            dispatch({
                type:"Tweet_Feed_Failed",
                payload:err
            })
        })
    }
}