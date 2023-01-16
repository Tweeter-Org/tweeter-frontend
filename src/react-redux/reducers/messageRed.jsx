const initialState = {
    loading: false,
    msgUser:{},
    toMsgUser:false,
    chatLists:{},
    viewChatList:false
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
        }
        case "CREATE_CHAT_FAILED":{
            console.log(action.payload)
        }
        case "VIEW_CHAT_LIST_START":{
            return {...state , loading:true};
        }
        case "VIEW_CHAT_LIST_SUCCESS":{
            console.log(action.payload)
            console.log(action.payload.data.mychats[0])
            return {
                ...state, loading:false, chatLists:action.payload.data.mychats, viewChatList:true
            }
        }
        case "VIEW_CHAT_LIST_FAILED":{
            console.log(action.payload)
        }
        default: return state;
    }
}

export default MsgSearchReducer