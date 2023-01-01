const initialState={
    response:"",
    error:"",
    tweetCreate:false
}

const TweetCreateReducer =(state=initialState, action)=>{
    switch(action.type){
        case "TWEETCREATED":{
            console.log(action.payload)
            return {...state , response:action.payload.data.msg, error:"", tweetCreate:true}
        }
        case "TWEETNOTCREATED":{
            console.log(action.payload)
            return {...state , error:action.payload, tweetCreate:false}
        }
        default : return state
    }
}
export default TweetCreateReducer