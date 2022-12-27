const initialState={
    response:"",
    error:"",
    isLiked:false
}

const TweetLikeReducer =(state=initialState, action)=>{
    switch(action.type){
        case "TWEETLIKE_START":{
            return {...state}
        }
        case "TWEETLIKE_SUCCESS":{
            console.log(action.payload)
            return {...state , response:action.payload.data.msg, isLiked:true, error:""}
        }
        case "TWEETLIKE_FAILED":{
            return {...state , error:action.payload , isLiked:false}
        }
        default : return state
    }
}
export default TweetLikeReducer