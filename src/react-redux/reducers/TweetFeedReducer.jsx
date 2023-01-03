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
        default: return state;
    }
}
