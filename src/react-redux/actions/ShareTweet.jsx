import BaseUrl from "./BaseUrl"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShareTweet = (data, socket) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type:"SHARE_TWEET"
        })
        await BaseUrl.post("/c/share",data, config)
            .then((Res) => {
                console.log(Res)
                toast.success("Message sent successfully", {
                    position: "top-center",
                    theme: "light",
                });
                socket.emit("new message", Res.data.msg)
                dispatch({
                    type: "SHARE_TWEET_YES",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "SHARE_TWEET_NO",
                    payload: err
                })
            })
    }
}