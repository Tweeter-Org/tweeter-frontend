import BaseUrl from "./BaseUrl"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TweetFeedAction } from "./Tweets";

export const ReplyToTweet = (formData) => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type:"REPLY_TWEET"
        })
        await BaseUrl.post("/r/create", formData, config)
            .then((Res) => {
                toast.success(`${Res.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "REPLY_TWEET_YES",
                    payload: Res
                })
                dispatch(TweetFeedAction())
            })
            .catch((err) => {
                toast.error(`${err.response.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "REPLY_TWEET_NO",
                    payload: err
                })
            })
    }
}


export const ViewTweetsReply = (id) => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type:"REPLY_TWEET"
        })
        await BaseUrl.get(`/r/tweetreplies/${id}`,config)
            .then((Res) => {
             
                dispatch({
                    type: "VIEW_REPLY_TWEET_YES",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "VIEW_REPLY_TWEET_NO",
                    payload: err
                })
            })
    }
}

export const ViewRepliesToReply = (id) => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type:"REPLY_TO_REPLY"
        })
        await BaseUrl.get(`/r/tweetreplies/${id}`,config)
            .then((Res) => {
            
                dispatch({
                    type: "VIEW_REPLY_TO_REPLY_YES",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "VIEW_REPLY_TO_REPLY_NO",
                    payload: err
                })
            })
    }
}


export const FakeReplyTweetAction = (tweeet) => {
    return {
        type: "TWEET_REPLY_ADD_ACTION",
        payload: {
            tweeet,
        }
    }
}

export const NameInReplyAction = (name) => {
    return {
        type: "NAME_IN_REPLY_ACTION",
        payload: name
    }
}
export const ShowNameInReplyAction = () => {
    return {
        type: "SHOW_NAME_IN_REPLY_ACTION",
       
    }
}