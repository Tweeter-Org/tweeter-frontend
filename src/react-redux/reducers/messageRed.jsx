const initialState = {
    loading: false,
    msgUser:{},
    toMsgUser:false
}
const MsgSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "MSG_SEARCH_SUCCEDED": return { ...state,msgUser: action.payload.result ,loading: false, toMsgUser:true }
        case "MSG_SEARCH_FAILED":{
            console.log(action.payload)

        }
      
        default: return state;
    }
}

export default MsgSearchReducer