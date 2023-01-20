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