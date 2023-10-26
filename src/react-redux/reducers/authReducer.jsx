const initialState ={
    loading:false,
    response:"",
    user:{},
    name2:'',
    username2:'',
    error:"",
    toFgtPwd:false,
    toOtp:false,
    toRstPwd:false,
    toSignOtp:false,
    toSignUpTwo:false,
    toHome:false,
    token:false,
    toLogin: false
}
 const AuthReducer =(state=initialState, action)=>{
    switch(action.type){
        case "REQUEST_STARTED":{
            localStorage.setItem("isToken", "false")
            return {
                ...state, loading:true, toFgtPwd:false
            }
        }
        case "REQUEST_SUCCEDED":{
            localStorage.setItem("access token", action.payload.token)
            return {...state,
                loading:false,
                response:action.payload.msg,
                user:action.payload.user,
                error:"",
                toFgtPwd:true,
                token:true,
            }
        }
        case "REQUEST_FAILED":{
            return { 
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toFgtPwd:false
            }
        }
        case "FGT_EMAIL_STARTED":{
            return {
                ...state, loading:true,toOtp:false
            }
        }
        case "FGT_EMAIL_SUCCEDED":{
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toOtp:true
            }
        }
        case "FGT_EMAIL_FAILED":{
            return {
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toOtp:false
            }
        }
        case "OTP_STARTED":{
            return {
                ...state, loading:true,toRstPwd:false
            }
        }
        case "OTP_SUCCEDED":{
            localStorage.setItem("otp token", action.payload.token)
            localStorage.setItem("isToken", "true")
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toRstPwd:true,
                token:true,
            }
        }
        case "OTP_FAILED":{
            return {
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toRstPwd:false
            }
        }
        case "RESEND_STARTED":{
            return {
                ...state, loading:true, toRstPwd:false
            }
        }
        case "RESEND_SUCCEDED":{
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toRstPwd: true
            }
        }
        case "RESEND_FAILED":{
            return {
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toRstPwd:false
            }
        }
        case "RESET_STARTED":{
            return {
                ...state, loading:true, toLogin: false
            }
        }
        case "RESET_SUCCEDED":{
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toLogin:true
            }
        }
        case "RESET_FAILED":{
            return {...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toLogin:false
            }
        }
        case "SIGNUP_STARTED":{
        localStorage.setItem("isToken", "false")
            return {
                ...state, loading:true, toSignOtp:false
            }
        }
        case "SIGNUP_SUCCEDED":{
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toSignOtp:true
            }
        }
        case "SIGNUP_FAILED":{
            return {
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toSignOtp:false
            }
        }
        case "EMAIL_VERIFY_STARTED":{
            return {
                ...state, loading:true,toSignUpTwo:false
            }
        }
        case "EMAIL_VERIFY_SUCCEDED":{
            localStorage.setItem("access token", action.payload.token)
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toSignUpTwo:true,
                token:true,
            }
        }
        case "EMAIL_VERIFY_FAILED":{
            return {
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toSignUpTwo:false
            }
        }
        case "SIGNUP_TWO_STARTED":{
            return {
                ...state, loading:true,
                toHome:false
            }
        }
        case "SIGNUP_TWO_SUCCEDED":{
            return {...state,
                loading:false,
                response:action.payload.msg,
                error:"",
                toHome:true,
                user:action.payload.user,
            }
        }
        case "SIGNUP_TWO_FAILED":{
            return {
                ...state,
                loading:false,
                response:"",
                error:action.payload.response.data.msg,
                toHome:false
            }
        }
        case "NAME_VIA_GOOGLE":{
            return {
             ...state , name2:action.payload.name, username2:action.payload.username
            }
        }
        case "INFO_VIA_GOOGLE":{
            return {...state, 
            user:action.payload.user
            }
        }
        case "LOG_OUT":{
            return {
                ...state, toFgtPwd: false
            }
        }
        default: return state;
    }
 }

 export default AuthReducer