const initialState={
    loading:false,
    deleteTweet:"",
    errorTweet:"",
    deleteSym:false
}

export const DeleteTweetsPReducer =(state=initialState, action)=>{
switch(action.type){
    case "TWEETDLT_SUCCESS":{
        console.log(action.payload)
        return {
        ...state, deleteTweet :action.payload.data.msg,loading:false, deleteSym:true, errorTweet:""
    }}
    case "TWEETDLT_FAILED":{console.log(action.payload)
        return {...state, loading:false , errorTweet:action.payload,deleteTweet:"", deleteSym:false}}
    default: return state;
}
}