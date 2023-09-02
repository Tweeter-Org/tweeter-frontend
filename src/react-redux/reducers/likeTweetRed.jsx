const initialState={
    loading:false,
    likedTweets:{}
}

export const LikedTweetsPReducer =(state=initialState, action)=>{
switch(action.type){
    case "LIKEDTWEETLISTYES":{
      
        return {
        ...state, likedTweets:action.payload.data.tweets,loading:false
    }}
    case "LIKEDTWEETLISTNO":{
        return {...state, loading:false }}
    default: return state;
}
}