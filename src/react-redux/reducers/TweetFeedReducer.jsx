const initialState={
    loadingTweet:false,
    tweetData:{}
}

export const TweetFeedReducer = (state=initialState, action)=>{
    switch(action.type){
        case "Tweet_Feed_Started":{
            return {...state, loadingTweet:true}
        }
        case "Tweet_Feed_Succeed":{
            console.log(action.payload)
            console.log(action.payload.data.tweets)
            return {...state, loadingTweet:false, tweetData:action.payload.data.tweets}
        }
        case "Tweet_Feed_Failed":{
            console.log(action.payload)
            return {...state, loadingTweet:false, tweetData:action.payload}
        }
        default: return state;
    }
}
