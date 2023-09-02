const initialState={
    loading:false,
    responseBM:'',
    bookmarkedTweet:{},
    errorBM:'',
    markBM:false
}

export const BookmarkReducer =(state=initialState, action)=>{
switch(action.type){
    case "DO_BOOKMARK": return {...state, loading:true};
    case "DO_BOOKMARK_SUCCESS":{
        return {
        ...state , responseBM:action.payload.data.msg, markBM:true, loading:false
    }}
    case "DO_BOOKMARK_FAILED":return {
        ...state, errorBM:action.payload, markBM:false , loading:false
    }
    case "SEE_BOOKMARK": return {...BookmarkReducer,loading:true};
    case "SEE_BOOKMARK_SUCCESS":return {
        ...state, bookmarkedTweet:action.payload.data.tweets,markBM:true, loading:false
    }
    case "SEE_BOOKMARK_FAILED":return {...state, markBM:false, loading:false}
    default: return state;
}
}

