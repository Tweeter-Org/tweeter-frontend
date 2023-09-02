import { useSelector } from "react-redux"

const initialState={
    loading:false,
   tagTweets:{},
   getTag:false
}

export const TagTweetFeedReducer = (state=initialState, action)=>{
    switch(action.type){
        case "TAG_TWEET_LIST_START":{
            return {...state, loading:true}
        }
        case "TAG_TWEET_LIST_SUCCEDED":{
            return {...state, loading:false, tagTweets:action.payload.data, getTag:true}
        }
        case "TAG_TWEET_LIST_FAILED":{
            return {...state, loading:false}
        }
        default: return state;
    }
}