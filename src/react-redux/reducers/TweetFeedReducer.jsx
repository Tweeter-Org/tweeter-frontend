import { useSelector } from "react-redux"

const initialState={
    loading:false,
    tweetData:{},
    liked:[],
    bookmarked:[],
    Rname:"",
    username:"",
    Rimage:null,
    Rvideo:null,
    Rtext:"",
    trendingTweet:{},
    privateRoute:false
}

export const TweetFeedReducer = (state=initialState, action)=>{
    switch(action.type){
        case "Tweet_Feed_Started":{
            return {...state, loading:true}
        }
        case "Tweet_Feed_Succeed":{
            return {...state, loading:false,privateRoute:true, tweetData:action.payload.data.tweets, liked:action.payload.data.liked, bookmarked:action.payload.data.bookmarked}
        }
        case "Tweet_Feed_Failed":{
            return {...state, loading:false, tweetData:action.payload, privateRoute:false}
        }
        case "Tweet_Feed_Two_Started":{
            return {...state, loading:true}
        }
        case "Tweet_Feed_Two_Succeed":{
            return {...state, loading:false,  tweetData:[...action.payload.data.tweets, ...state.tweetData], liked:action.payload.data.liked, bookmarked:action.payload.data.bookmarked}
        }
        case "Tweet_Feed_Two_Failed":{
            return {...state}
        }
        case "TWEET_FEED_ADD_ACTION":{
            return {
                ...state, tweetData:[action.payload.tweeet, ...state.tweetData]
            }
        }
        case "RETWEET_FEED_ADD_ACTION":{
            return {
                ...state, tweetData:[action.payload.retweeet, ...state.tweetData]
            }
        }
        case "RETWEET_DETAILS":{
            return {
                ...state, Rname:action.payload.name , Rtext:action.payload.text , Rimage:action.payload.image , Rvideo:action.payload.video
            }
        }
        case "TRENDING_TWEET_YES":{
            return {...state, loading:false, trendingTweet:action.payload.data.tags}
        }
        default: return state;
    }
}


const initialCount={
    count:1
}

export const TweetFeedCountRed =(state=initialCount, action)=>{
    switch(action.type){
        case "Tweet_Feed_Count": {
            return {
                ...state , count:state.count+1
            }  
        }
        default: return state
    }

}