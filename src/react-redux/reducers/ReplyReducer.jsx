const initialState={
    loading:false,
    responseT:"",
    errorT:"",
    replyT:"",
    replyR:""
}

export const ReplyReducer=(state=initialState, action)=>{
    switch(action.type){
        case "REPLY_TWEET":{
            return {...state, loading:true}
        }
        case "REPLY_TWEET_YES":{
            return{
                ...state, loading:false, responseT:action.payload.data, errorT:""
            }
        }
        case "REPLY_TWEET_NO":{
            return{
                ...state, loading:false, errorT:action.payload, responseT:""
            }
        }
        case "VIEW_REPLY_TWEET_YES":{
            console.log(action.payload)
            return{
                ...state, loading:false, errorT:"",replyT:action.payload.data, responseT:""
            }
        }
        case "VIEW_REPLY_TWEET_NO":{
            console.log(action.payload)
            return{
                ...state, loading:false, errorT:action.payload, responseT:""
            }
        }
        case "REPLY_TO_REPLY":{
            return {...state}
        }
        case "VIEW_REPLY_TO_REPLY_YES":{
            console.log(action.payload)
            return{
                ...state, replyR:action.payload.data.replies, errorT:""
            }
        }
        case "VIEW_REPLY_TO_REPLY_NO":{
            return{
                ...state, errorT:action.payload, responseT:""
            }
        }
        default : return state;
    }
}