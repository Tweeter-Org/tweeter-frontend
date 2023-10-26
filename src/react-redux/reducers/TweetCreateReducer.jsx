const initialState={
    response:"",
    error:"",
    tweetCreate:false,
    loading:false,
    toastBoolE:false,
    toastBoolR:false
}

const TweetCreateReducer =(state=initialState, action)=>{
    switch(action.type){
        case "CREATERETWEETSTART":{
            return {
                ...state, toastBoolE:false, toastBoolR:false
            }
        }
        case "CREATERETWEETSTART":{
            return {
                ...state, toastBoolE:false, toastBoolR:false
            }
        }
        case "TWEETCREATED":{
            
            return {...state , response:action.payload.data.msg, error:"",toastBoolR:true, toastBoolE:false, tweetCreate:true, loading:false}
        }
        case "TWEETNOTCREATED":{
            
            return {...state , error:action.payload.response.data.msg,toastBoolE:true,toastBoolR:false, tweetCreate:false, loading:false}
        }
        case "RETWEETCREATED":{
          
            return {...state , response:action.payload.data.msg,toastBoolR:true, toastBoolE:false, error:"", tweetCreate:true, loading:false}
        }
        case "RETWEETNOTCREATED":{
            
            return {...state , error:action.payload , toastBoolE:true, toastBoolR:false, tweetCreate:false, loading:false}
        }
        default : return state
    }
}
export default TweetCreateReducer