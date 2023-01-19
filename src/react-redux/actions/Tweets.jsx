import axios from "axios";
import React from "react";
import BaseUrl from "./BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const TweetFeedAction = () => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "Tweet_Feed_Started",
            payload: ""
        })
        await BaseUrl.get('/t/feed?page=0', config)
            .then((res) => {
                dispatch({
                    type: "Tweet_Feed_Succeed",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "Tweet_Feed_Failed",
                    payload: err
                })
            })
    }
}

export const TweetFeedCount = () => {
    return {
        type: "Tweet_Feed_Count",
    }
}
export const TweetFeedAction2 = (count) => {
    var c= count++;
    console.warn(c)
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "Tweet_Feed_Two_Started",
            payload: ""
        })
        await BaseUrl.get(`/t/feed?page=${c}`, config)
            .then((res) => {
                dispatch({
                    type: "Tweet_Feed_Two_Succeed",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "Tweet_Feed_Two_Failed",
                    payload: err
                })
            })
    }
}

function TweetLikeAction(tweetId) {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "TWEETLIKE_START",
        })
        await BaseUrl.post("/t/like", { tweetId }, config)
            .then((res) => {
                dispatch({
                    type: "TWEETLIKE_SUCCESS",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "TWEETLIKE_FAILED",
                    payload: err
                })
            })
    }
}
export default TweetLikeAction

export const CreateTweetAct = (formData) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "CREATETWEETSTART"
        })
        await BaseUrl.post("/t/create", formData, config)
            .then((Res) => {
                console.log(Res)
                dispatch({
                    type: "TWEETCREATED",
                    payload: Res
                })
                toast.success(`${Res.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
            })
            .catch((err) => {
                toast.error(`${err.response.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "TWEETNOTCREATED",
                    payload: err
                })
              
            })
    }
}

export const CreateReTweetAct = (formData) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "CREATERETWEETSTART"
        })
        await BaseUrl.post("/t/retweet", formData, config)
            .then((Res) => {
                console.log(Res)
                toast.success(`${Res.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "RETWEETCREATED",
                    payload: Res
                })
            })
            .catch((err) => {
                toast.error(`${err.response.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "RETWEETNOTCREATED",
                    payload: err
                })
            })
    }
}

export const LikedTweetAction = (username) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        await BaseUrl.get(`/p/liked/${username}`, config)
            .then((Res) => {
                console.log(Res)
                dispatch({
                    type: "LIKEDTWEETLISTYES",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "LIKEDTWEETLISTNO",
                    payload: err
                })
            })
    }

}

export const FakeTweetFeedAction = (tweeet,) => {
    return {
        type: "TWEET_FEED_ADD_ACTION",
        payload: {
            tweeet,
        }
    }
}
export const FakeReTweetFeedAction = (retweeet) => {
    return {
        type: "RETWEET_FEED_ADD_ACTION",
        payload: {
            retweeet,
        }
    }
}

const TweetListWithTag = (tag) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({ type: "TAG_TWEET_LIST_START" })
        console.log("hash")
        await BaseUrl.get(`/t/tagged/${tag}`, config)
            .then((res) => dispatch({
                type: "TAG_TWEET_LIST_SUCCEDED",
                payload: res
            }))
            .catch((err) => {
                dispatch({
                    type: "TAG_TWEET_LIST_FAILED",
                    payload: err
                })
            })
    }
}

export { TweetListWithTag }

export const RetweetDetails = (tweetid, name, video, text, image) => {
    return {
        type: "RETWEET_DETAILS",
        payload: {
            image,
            text,
            video,
            name,
            tweetid
        }
    }
}