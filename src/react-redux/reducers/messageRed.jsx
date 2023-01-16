const initialState = {
    loading: false,
    msgUser:{},
    toMsgUser:false,
    chatLists:{},
    viewChatList:false,
    isActive:false,
    viewChatMsgs:{}
}
const MsgSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MSG_SEARCH_SUCCEDED": return { ...state,msgUser: action.payload.result ,loading: false, toMsgUser:true }
        case "MSG_SEARCH_FAILED":{
            console.log(action.payload)
        }
        case "CREATE_CHAT_START":{
            return state;
        }
        case "CREATE_CHAT_SUCCESS":{
            console.log(action.payload)
            return state;
        }
        case "CREATE_CHAT_FAILED":{
            console.log(action.payload)
            return state;
        }
        case "VIEW_CHAT_LIST_START":{
            return {...state , loading:true};
        }
        case "VIEW_CHAT_LIST_SUCCESS":{
            console.log(action.payload)
            return {
                ...state, loading:false, chatLists:action.payload.data.mychats, viewChatList:true
            }
        }
        case "VIEW_CHAT_LIST_FAILED":{
            console.log(action.payload)
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
            console.log(action.payload)
            return state;
        }
        case "Chat_not_sent":{
            console.log(action.payload)
            return state;
        }
        case "VIEW_CHAT_YES":{
            console.log(action.payload)
            return {
                ...state, viewChatMsgs:action.payload.data
            }
        }
        case "VIEW_CHAT_NO":{
            console.log(action.payload)
            return state;
        }
        default: return state;
    }
}

export default MsgSearchReducer