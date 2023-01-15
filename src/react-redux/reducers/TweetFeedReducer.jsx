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
    Rtext:""
}

export const TweetFeedReducer = (state=initialState, action)=>{
    switch(action.type){
        case "Tweet_Feed_Started":{
            return {...state, loading:true}
        }
        case "Tweet_Feed_Succeed":{
            console.log(action.payload)
            return {...state, loading:false, tweetData:action.payload.data.tweets, liked:action.payload.data.liked, bookmarked:action.payload.data.bookmarked}
        }
        case "Tweet_Feed_Failed":{
            console.log(action.payload)
            return {...state, loading:false, tweetData:action.payload}
        }
        case "Tweet_Feed_Two_Started":{
            return {...state, loading:true}
        }
        case "Tweet_Feed_Two_Succeed":{
            console.log(action.payload)
            // return {...state}
            return {...state, loading:false, tweetData:action.payload.data.tweets, liked:action.payload.data.liked, bookmarked:action.payload.data.bookmarked}
        }
        case "Tweet_Feed_Two_Failed":{
            console.log(action.payload)
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
        default: return state;
    }
}

// const tw = useSelector((t)=>t.TweetFeedReducer)
// const {tweetData} = tw;
// console.log(tw)
// const tweetState ={
// tweetData:[]
// }

// export const FakeTweetFeedReducer = (state=tweetState, action) =>{
//     switch(action.type){
//         case "TWEET_FEED_ADD_ACTION":{
//             return {
//                 ...state, tweetData : action.payload, 
//             }
//         }
//         default:return state;
//     }

// }

const initialCount={
    count:0
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