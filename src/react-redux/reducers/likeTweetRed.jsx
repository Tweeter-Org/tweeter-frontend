const initialState={
    loading:false,
    likedTweets:{}
}

export const LikedTweetsPReducer =(state=initialState, action)=>{
switch(action.type){
    case "LIKEDTWEETLISTYES":{
        console.log(action.payload)
        return {
        ...state, likedTweets:action.payload.data.tweets
    }}
    case "LIKEDTWEETLISTNO":{console.log(action.payload)
        return {...state, }}
    default: return state;
}
}