const initialState={
    response:"",
    error:"",
   isFollow:false,
   loading:false
}

const FollowReducer =(state=initialState, action)=>{
    switch(action.type){
        case "FOLLOW_START":{
            return {...state, loading:true}
        }
        case "FOLLOW_SUCCESS":{
            console.log(action.payload)
            return {...state ,loading:false, response:action.payload.data.msg, isFollow :true, error:""}
        }
        case "FOLLOW_FAILED":{
            return {...state ,loading:false, error:action.payload , isFollow:false}
        }
        default : return state
    }
}
export default FollowReducer