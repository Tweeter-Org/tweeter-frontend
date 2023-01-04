import React from "react";
import BaseUrl from "./BaseUrl";

const accessToken = sessionStorage.getItem("access token")
console.log(accessToken)
const config={
    headers:{
        "Authorization" : `Bearer ${accessToken}`
    }
}

function TweetDeleteAction (tweetId){
    return async function (dispatch){
        dispatch({
            type:"TWEETDLT_START",
        })
        await BaseUrl.delete(`/t/delete/${tweetId}`,config)
        .then((res)=>{
            dispatch({
                type:"TWEETDLT_SUCCESS",
                payload:res
            })
        })
        .catch((err)=>{
            dispatch({
                type:"TWEETDLT_FAILED",
                payload:err
            })
        })

    }
}
export default TweetDeleteAction

export const FakeTweetDeleteAction =(tweeetId)=>{
    return {
     type:"FAKE_TWEET_DELETE_ACTION",
     payload: tweeetId,
    }
 }
 