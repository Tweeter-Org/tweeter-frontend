const initialState ={
    loading:"false",
    response:"",
    error:""
}

const rootReducer =(state=initialState, action)=>{
switch(action.type){
    case "REQUEST_STARTED":{
        console.log(action.payload)
        return {
            ...state, loading:"true"
        }
    }
    case "REQUEST_SUCCEDED":{
        console.log(action.payload)
        return {
            loading:"false",
            response:action.payload.msg,
            error:""
        }
    }
    case "REQUEST_FAILED":{
        console.log(action.payload)
        console.log(action.payload.response.data.msg)
        return {
            loading:"false",
            response:"",
            error:action.payload.response.data.msg
        }
    }
    default:
        return state;
}
}

export default rootReducer