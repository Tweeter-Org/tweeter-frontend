const initialState={
    responseGoogle:'',
    response2:'',
    error2:'',
    mark:false
}

const GoogleReducer =(state=initialState, action)=>{
    switch(action.type){
        case "GOOGLE_STARTED":return {
            ...state
        }
        case "GOOGLE_SUCCEDED":return {
            ...state, responseGoogle:action.payload, mark:true
        }
        case "GOOGLE_TWO_STARTED":return {
             ...state
        }
        case "GOOGLE_TWO_SUCCEDED":{
            localStorage.setItem("access token", action.payload.data.token)
            return {
            ...state, response2:action.payload.data,mark:true, error2:""
        }}
        case "GOOGLE_TWO_FAILED":{
            return {
            ...state, error2:action.payload, response2:"", mark:false
        }}
        default:return state
    }
}

export default GoogleReducer