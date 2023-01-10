const initialState={
    response:"",
    error:"",
    tweetCreate:false,
    loading:false
}

const TweetCreateReducer =(state=initialState, action)=>{
    switch(action.type){
        case "TWEETCREATED":{
            console.log(action.payload)
            return {...state , response:action.payload.data.msg, error:"", tweetCreate:true, loading:false}
        }
        case "TWEETNOTCREATED":{
            console.log(action.payload)
            return {...state , error:action.payload.data.msg, tweetCreate:false, loading:false}
        }
        case "RETWEETCREATED":{
            console.log(action.payload)
            return {...state , response:action.payload.data.msg, error:"", tweetCreate:true, loading:false}
        }
        case "RETWEETNOTCREATED":{
            console.log(action.payload)
            return {...state , error:action.payload, tweetCreate:false, loading:false}
        }
        default : return state
    }
}
export default TweetCreateReducer