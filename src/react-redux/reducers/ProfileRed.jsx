import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

const initialState={
    loading:false,
    profile:{},
    error:"",
    accessProfile:false,
editprofile:{},
ifedit:false
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
        case "EDIT_PROFILE":return {...state, loading:true, ifedit:false}
        case "EDIT_PROFILE_SUCCED":{
            console.log(action.payload)
            return{
                ...state, loading:false, editprofile:action.payload.data, accessProfile:true, ifedit:true
            }

        }  
        case "EDIT_PROFILE_FAIL":{
            console.log(action.payload)
            return{
            ...state, loading:false, editprofile:action.payload, accessProfile:false, ifedit:true
        }
    }
        default :return state
    }
}