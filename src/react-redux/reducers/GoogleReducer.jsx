const initialState={
    loadingGoogle:false,
    responseGoogle:'',
}

const GoogleReducer =(state=initialState, action)=>{
    switch(action.type){
        case "GOOGLE_STARTED":return {
            ...state, loadingGoogle:true
        }
        case "GOOGLE_SUCCEDED":return {
            ...state, loadingGoogle:false, responseGoogle:action.payload
        }
        default:return state
    }
}

export default GoogleReducer