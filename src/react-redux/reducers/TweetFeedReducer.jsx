import { useSelector } from "react-redux"

const initialState={
    loading:false,
    tweetData:{},
    liked:[]
}

export const TweetFeedReducer = (state=initialState, action)=>{
    switch(action.type){
        case "Tweet_Feed_Started":{
            return {...state, loading:true}
        }
        case "Tweet_Feed_Succeed":{
            console.log(action.payload)
            return {...state, loading:false, tweetData:action.payload.data.tweets, liked:action.payload.data.liked}
        }
        case "Tweet_Feed_Failed":{
            console.log(action.payload)
            return {...state, loading:false, tweetData:action.payload}
        }
        case "TWEET_FEED_ADD_ACTION":{
            return {
                ...state, tweetData:[action.payload.tweeet, ...state.tweetData]
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