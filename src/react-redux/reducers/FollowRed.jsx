const initialState={
    response:"",
    error:"",
   isFollow:false
}

const FollowReducer =(state=initialState, action)=>{
    switch(action.type){
        case "FOLLOW_START":{
            return {...state}
        }
        case "FOLLOW_SUCCESS":{
            console.log(action.payload)
            return {...state , response:action.payload.data.msg, isFollow :true, error:""}
        }
        case "FOLLOW_FAILED":{
            return {...state , error:action.payload , isFollow:false}
        }
        default : return state
    }
}
export default FollowReducer