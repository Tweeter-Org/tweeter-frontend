import BaseUrl from "./BaseUrl";

const MsgSearchUser = (char) => {
   return async function (dispatch) {
      await BaseUrl.get(`/search?find=${char}`)
         .then((res) => dispatch({
            type: "MSG_SEARCH_SUCCEDED",
            payload: res.data
         }))
         .catch((err) => {
            console.log(err)
            dispatch({
               type: "MSG_SEARCH_FAILED",
               payload: err
            })
         })
   }
}
export default MsgSearchUser

function CreateChat(id) {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "CREATE_CHAT_START",
        })
        await BaseUrl.get(`/c/chat/${id}`, config)
            .then((res) => {
                dispatch({
                    type: "CREATE_CHAT_SUCCESS",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "CREATE_CHAT_FAILED",
                    payload: err
                })
            })
    }
}

export {CreateChat}


function ViewChatList () {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "VIEW_CHAT_LIST_START",
        })
        await BaseUrl.get("/c/mychats", config)
            .then((res) => {
                dispatch({
                    type: "VIEW_CHAT_LIST_SUCCESS",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "VIEW_CHAT_LIST_FAILED",
                    payload: err
                })
            })
    }
}

export {ViewChatList}

function ActiveUserList (){
    return {
        type:"Is_Active_User",
    }
}

export {ActiveUserList}

function InactiveUserList (){
    return {
        type:"InActive_User",
    }
}

export {InactiveUserList}

export const SendChatsAction = (formData) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        await BaseUrl.post("/c/message", formData, config)
            .then((Res) => {
                dispatch({
                    type: "Chat_sent",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "Chat_not_sent",
                    payload: err
                })
            })
    }
}

export const ViewChatsAction = (chatid) => {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        await BaseUrl.get(`/c/messages/${chatid}`, config)
            .then((Res) => {
                console.log(Res)
                dispatch({
                    type: "VIEW_CHATS_YES",
                    payload: Res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "VIEW_CHATS_NO",
                    payload: err
                })
            })
    }
}