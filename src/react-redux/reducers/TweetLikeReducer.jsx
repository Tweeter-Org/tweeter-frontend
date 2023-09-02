const initialState={
    response:"",
    error:"",
    isLiked:false,
    isDelete:false
}

const TweetLikeReducer =(state=initialState, action)=>{
    switch(action.type){
        case "TWEETLIKE_START":{
            return {...state}
        }
        case "TWEETLIKE_SUCCESS":{
   return {...state , response:action.payload.data.msg, isLiked:true, error:""}
        }
        case "TWEETLIKE_FAILED":{
            return {...state , error:action.payload , isLiked:false}
        }
        // case "TWEETDLT_START":{
        //     return {...state}
        // }
        // case "TWEETDLT_SUCCESS":{
        //   
        //     return {...state , response:action.payload.data.msg, isDelete:true, error:""}
        // }
        // case "TWEETDLT_FAILED":{
        //     return {...state , error:action.payload , isDelete:false}
        // }
        default : return state
    }
}
export default TweetLikeReducer