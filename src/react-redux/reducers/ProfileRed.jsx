import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

const initialState={
    loading:false,
    profile:{},
    error:"",
    accessProfile:false

}


export function ProfileReducer(state=initialState, action){
    switch(action.type){
        case "VIEW_PROFILE":return {...state, loading:true,  accessProfile:false};
        case "VIEW_PROFILE_SUCCED":return{
            ...state, loading:false, profile:action.payload.data, accessProfile:true
        }
        case "VIEW_PROFILE_FAIL":return{
            ...state, loading:false, error:action.payload, accessProfile:false
        }
        default :return state
    }
}