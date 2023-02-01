import BaseUrl from "./BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ViewNotifyAction = () => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "View_Notifs_Started",
            payload: ""
        })
        await BaseUrl.get('/p/mynotifs', config)
            .then((res) => {
                dispatch({
                    type: "View_Notifs_Succeed",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "View_Notifs_Failed",
                    payload: err
                })
            })
    }
}


export const ReadNotifyAction = (id) => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "Read_Notifs_Started",
            payload: ""
        })
        await BaseUrl.put(`/p/readnotif/${id}`, config)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: "Read_Notifs_Succeed",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "Read_Notifs_Failed",
                    payload: err
                })
            })
    }
}





export const AddChatNotify =(newUnseenChat)=>{
    console.log(newUnseenChat)
    return {
        type:"ADD_CHAT_NOTIFY",
        payload:{newUnseenChat}
    }
}

export const NotifyChatSeen =(id)=>{
    return {
        type:"NOTIFY_CHAT_SEEN",
        payload:{id}
    }
}

export const ViewNotifyTweet = (id) => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "View_Notif_Tweet_Started",
            payload: ""
        })
        await BaseUrl.get(`/t/tweet/${id}`, config)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: "View_Notif_Tweet_Succeed",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "View_Notif_Tweet_Failed",
                    payload: err
                })
            })
    }
}