import BaseUrl from "./BaseUrl"

export const ReplyToTweet = (formData) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
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