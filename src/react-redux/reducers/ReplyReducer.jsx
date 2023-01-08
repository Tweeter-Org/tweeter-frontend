const initialState={
    loading:false,
    responseT:"",
    errorT:""
}

export const ReplyReducer=(state=initialState, action)=>{
    switch(action.type){
        case "REPLY_TWEET_YES":{
            return{
                ...state, loading:true, responseT:action.payload.data, errorT:""
            }
        }
        case "REPLY_TWEET_NO":{
            return{
                ...state, loading:true, errorT:action.payload, responseT:""
            }
        }
        default : return state;
    }
}