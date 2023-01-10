import BaseUrl from "./BaseUrl"

export const ReplyToTweet = (formData) => {
    const accessToken = sessionStorage.getItem("access token")
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
                console.log(Res)
                dispatch({
                    type: "REPLY_TWEET_YES",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "REPLY_TWEET_NO",
                    payload: err
                })
            })
    }
}

export const ViewTweetsReply = (id) => {
    const accessToken = sessionStorage.getItem("access token")
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
                console.log(Res)
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
    const accessToken = sessionStorage.getItem("access token")
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
                console.log(Res)
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