const initialState ={
    loading:false,
    response:"",
    error:"",
    toFgtPwd:false,
    toOtp:false,
    toRstPwd:false,
    toSignOtp:false,
    toSignUpTwo:false
}
 const AuthReducer =(state=initialState, action)=>{
    switch(action.type){
        case "REQUEST_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true, toFgtPwd:false
            }
        }
        case "REQUEST_SUCCEDED":{
            console.log(action.payload)
            localStorage.setItem("access token", action.payload.token)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toFgtPwd:true
            }
        }
        case "REQUEST_FAILED":{
            console.log(action.payload)
            console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toFgtPwd:false
            }
        }
        case "FGT_EMAIL_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true,toOtp:false
            }
        }
        case "FGT_EMAIL_SUCCEDED":{
            console.log(action.payload)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toOtp:true
            }
        }
        case "FGT_EMAIL_FAILED":{
            console.log(action.payload)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toOtp:false
            }
        }
        case "OTP_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true,toRstPwd:false
            }
        }
        case "OTP_SUCCEDED":{
            console.log(action.payload)
            localStorage.setItem("access token", action.payload.token)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toRstPwd:true
            }
        }
        case "OTP_FAILED":{
            console.log(action.payload)
            console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toRstPwd:false
            }
        }
        case "RESEND_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true
            }
        }
        case "RESEND_SUCCEDED":{
            console.log(action.payload)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:""
            }
        }
        case "RESEND_FAILED":{
            console.log(action.payload)
            console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg
            }
        }
        case "RESET_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true
            }
        }
        case "RESET_SUCCEDED":{
            console.log(action.payload)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:""
            }
        }
        case "RESET_FAILED":{
            console.log(action.payload)
            console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg
            }
        }
        case "SIGNUP_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true, toSignOtp:false
            }
        }
        case "SIGNUP_SUCCEDED":{
            console.log(action.payload)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toSignOtp:true
            }
        }
        case "SIGNUP_FAILED":{
            console.log(action.payload)
            console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toSignOtp:false
            }
        }
        case "EMAIL_VERIFY_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true,toSignUpTwo:false
            }
        }
        case "EMAIL_VERIFY_SUCCEDED":{
            console.log(action.payload)
            localStorage.setItem("access token", action.payload.token)
            console.log(action.payload.token)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toSignUpTwo:true
            }
        }
        case "EMAIL_VERIFY_FAILED":{
            console.log(action.payload)
            console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toSignUpTwo:false
            }
        }
        case "SIGNUP_TWO_STARTED":{
            console.log(action.payload)
            return {
                ...state, loading:true
            }
        }
        case "SIGNUP_TWO_SUCCEDED":{
            console.log(action.payload)
            // localStorage.setItem("access token", action.payload.token)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:""
            }
        }
        case "SIGNUP_TWO_FAILED":{
            console.log(action.payload)
            // console.log(action.payload.response.data.msg)
            return {
                loading:false,
                response:"",
                error:action.payload.response.data.msg
            }
        }
        default: return state;
    }
 }

 export default AuthReducer