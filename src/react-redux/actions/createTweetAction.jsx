import React from "react";
import BaseUrl from "./BaseUrl";


const accessToken = localStorage.getItem("access token")
console.log(accessToken)
const config={
    headers:{
        "Authorization" : `Bearer ${accessToken}`
    }
}

export const CreateTweetAct =(formData)=>{
    return async function (dispatch){
        await BaseUrl.post("/t/create",formData,config)
        .then((Res)=>{
            console.log(Res)
            dispatch({
                type:"TWEETCREATED",
                payload:Res
            })
        })
        .catch((err)=>{
            dispatch({
                type:"TWEETNOTCREATED",
                payload:err
            })
        })
    }
}