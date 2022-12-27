import React from "react";
import BaseUrl from "./BaseUrl";

const accessToken = localStorage.getItem("access token")
console.log(accessToken)
const config={
    headers:{
        "Authorization" : `Bearer ${accessToken}`
    }
}

function TweetLikeAction (tweetId){
    return async function (dispatch){
        dispatch({
            type:"TWEETLIKE_START",
        })
        await BaseUrl.post("/t/like",{tweetId},config)
        .then((res)=>{
            dispatch({
                type:"TWEETLIKE_SUCCESS",
                payload:res
            })
        })
        .catch((err)=>{
            dispatch({
                type:"TWEETLIKE_FAILED",
                payload:err
            })
        })

    }
}
export default TweetLikeAction