import BaseUrl from "./BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ViewNotifyAction = () => {
    const accessToken =sessionStorage.getItem("access token")
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
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    console.log(config)
    return async function (dispatch) {
        dispatch({
            type: "Read_Notifs_Started",
            payload: ""
        })
        await BaseUrl.patch(`/p/readnotif/${id}`, config)
            .then((res) => {
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





export const AddChatNotify =(new_unseen_chat)=>{
    return {
        type:"ADD_CHAT_NOTIFY",
        payload:new_unseen_chat
    }
}

export const NotifyChatSeen =(new_seen_chat)=>{
    return {
        type:"NOTIFY_CHAT_SEEN",
        payload:new_seen_chat
    }
}