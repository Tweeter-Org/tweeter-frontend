const initialState={
    loading:false,
    responseT:"",
    errorT:"",
    replyT:"",
    replies:{},
    replyR:"",
    nameInReply:[],
    replyShow:false,
    showName:false
}

export const ReplyReducer=(state=initialState, action)=>{
    switch(action.type){
        case "REPLY_TWEET":{
            return {...state, loading:true}
        }
        case "REPLY_TWEET_YES":{console.log(action.payload)
            return{
                ...state, loading:false, responseT:action.payload.data.msg, errorT:""
            }
        }
        case "REPLY_TWEET_NO":{console.log(action.payload)
            return{
                ...state, loading:false, errorT:action.payload.data.msg, responseT:""
            }
        }
        case "VIEW_REPLY_TWEET_YES":{
            console.log(action.payload)
            return{
                ...state, loading:false, errorT:"",replyT:action.payload.data, replies:action.payload.data.replies, responseT:""
            }
        }
        case "VIEW_REPLY_TWEET_NO":{
            console.log(action.payload)
            return{
                ...state, loading:false, errorT:action.payload, responseT:""
            }
        }
        case "REPLY_TO_REPLY":{
            return {...state, loading:true}
        }
        case "VIEW_REPLY_TO_REPLY_YES":{
            console.log(action.payload)
            return{
                ...state, replyR:action.payload.data.replies, errorT:"", replyShow:true, loading:false
            }
        }
        case "VIEW_REPLY_TO_REPLY_NO":{
            return{
                ...state, errorT:action.payload, responseT:"", replyShow:false, loading:false
            }
        }
        case "TWEET_REPLY_ADD_ACTION":{
            return {
                ...state, replies:[action.payload.tweeet, ...state.replies]
            }
        }
        case "NAME_IN_REPLY_ACTION":{
            return {
                ...state, nameInReply:action.payload, showName:true
            }
        }
        case "SHOW_NAME_IN_REPLY_ACTION":{
            return {
                ...state, showName:false
            }
        }
        
        // case "NAME_IN_REPLY_ACTION":{
        //     return {
        //         ...state, nameInReply:[action.payload, ...state.nameInReply]
        //     }
        // }
        default : return state;
    }
}