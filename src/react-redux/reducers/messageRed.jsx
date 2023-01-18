const initialState = {
    loading: false,
    msgUser:{},
    toMsgUser:false,
    chatLists:{},
    viewChatList:false,
    isActive:false,
    viewChatMsgs:{},
    sendChatMessage:{}
}
const MsgSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MSG_SEARCH_SUCCEDED": return { ...state,msgUser: action.payload.result ,loading: false, toMsgUser:true }
        case "MSG_SEARCH_FAILED":{
          
        }
        case "CREATE_CHAT_START":{
            return state;
        }
        case "CREATE_CHAT_SUCCESS":{
         
            return state;
        }
        case "CREATE_CHAT_FAILED":{
           
            return state;
        }
        case "VIEW_CHAT_LIST_START":{
            return {...state , loading:true};
        }
        case "VIEW_CHAT_LIST_SUCCESS":{
         
            return {
                ...state, loading:false, chatLists:action.payload.data.mychats, viewChatList:true
            }
        }
        case "VIEW_CHAT_LIST_FAILED":{
           
            return state;
        }
        case "Is_Active_User":{
            return {
                ...state, isActive:true
            }
        }
        case "InActive_User":{
            return {
                ...state, isActive:false
            }
        }
        case "Chat_sent":{
          
            return {...state, sendChatMessage:action.payload.data.msg};
        }
        case "Chat_not_sent":{
           
            return state;
        }
        case "TO_VIEW_CHATS":{
            return {
                ...state, loading:true
            }
        }
        case "VIEW_CHATS_YES":{
           
            return {
                ...state, viewChatMsgs:action.payload.data.messages, loading:false
            }
        }
        case "VIEW_CHATS_NO":{
           
            return {...state, loading:false};
        }
        case "FAKE_CHAT_ADD_ACTION":{
            return {
                ...state, viewChatMsgs :[...state.viewChatMsgs, action.payload.newChat]
            }
        }
        default: return state;
    }
}

export default MsgSearchReducer