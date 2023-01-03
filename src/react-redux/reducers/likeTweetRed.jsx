const initialState={
    loading:false,
    likedTweets:{}
}

export const LikedTweetsPReducer =(state=initialState, action)=>{
switch(action.type){
    case "LIKEDTWEETLISTYES":{
        console.log(action.payload)
        return {
        ...state, likedTweets:action.payload.data.tweets,loading:false
    }}
    case "LIKEDTWEETLISTNO":{console.log(action.payload)
        return {...state, loading:false }}
    default: return state;
}
}