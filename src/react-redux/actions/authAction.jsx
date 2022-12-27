import axios from "axios"
import BaseUrl from "./BaseUrl"

const LogInUser = (data, condition) => {
    return async function (dispatch) {
        if (condition) {
            dispatch({ type: "REQUEST_STARTED" })
            await axios.post("https://twitterbackend-production-93ac.up.railway.app/login", data)
                .then((res) => dispatch({
                    type: "REQUEST_SUCCEDED",
                    payload: res.data
                }))
                .catch((err) => {
                    dispatch({
                        type: "REQUEST_FAILED",
                        payload: err
                    })
                })
        }
    }
}
export default LogInUser

const FgtPwdAction = (email, condition) => {
    return async function (dispatch) {
        if (condition) {
            console.log(email)
            dispatch({ type: "FGT_EMAIL_STARTED" })
            await axios.post("https://twitterbackend-production-93ac.up.railway.app/forgotpwd", { email })
                .then((res) => dispatch({
                    type: "FGT_EMAIL_SUCCEDED",
                    payload: res.data
                }))
                .catch((err) => {
                    dispatch({
                        type: "FGT_EMAIL_FAILED",
                        payload: err
                    })
                })
        }
    }
}
export { FgtPwdAction }

const OtpAction = (data) => {
    return async function (dispatch) {
        dispatch({ type: "OTP_STARTED" })
        await axios.post("https://twitterbackend-production-93ac.up.railway.app/forgotpwd/verify", data)
            .then((res) => dispatch({
                type: "OTP_SUCCEDED",
                payload: res.data
            }))
            .catch((err) => {
                dispatch({
                    type: "OTP_FAILED",
                    payload: err
                })
            })
    }
}
export { OtpAction }

const ResendOtpAction = (email) => {
    return async function (dispatch) {
        dispatch({ type: "RESEND_STARTED" })
        await axios.post("https://twitterbackend-production-93ac.up.railway.app/resendotp", { email })
            .then((res) => dispatch({
                type: "RESEND_SUCCEDED",
                payload: res.data
            }))
            // navigate("/reset"))
            .catch((err) => {
                dispatch({
                    type: "RESEND_FAILED",
                    payload: err
                })
            })
    }
}
export { ResendOtpAction }

const SignUpUser = (email, condition) => {
    return async function (dispatch) {
        if (condition) {
            dispatch({ type: "SIGNUP_STARTED" })
            await axios.post("https://twitterbackend-production-93ac.up.railway.app/email", { email })
                .then((res) => dispatch({
                    type: "SIGNUP_SUCCEDED",
                    payload: res.data
                })
                    // navigate("/verifyemail")
                )
                .catch((err) => {
                    dispatch({
                        type: "SIGNUP_FAILED",
                        payload: err
                    })
                })
        }
    }
}
export { SignUpUser }

const EmailAction = (data) => {
    return async function (dispatch) {
        dispatch({ type: "EMAIL_VERIFY_STARTED" })
        await axios.post("https://twitterbackend-production-93ac.up.railway.app/email/verify", data)
            .then((res) => dispatch({
                type: "EMAIL_VERIFY_SUCCEDED",
                payload: res.data
            })
            )
            .catch((err) => {
                dispatch({
                    type: "EMAIL_VERIFY_FAILED",
                    payload: err
                })
            })
    }
}
export { EmailAction }

const SignUpResend=(email)=>{
    return async function (dispatch){
          dispatch({type:"SIGNUP_STARTED"})
          await axios.post("https://twitterbackend-production-93ac.up.railway.app/email",{email})
          .then((res)=>dispatch({
             type:"SIGNUP_SUCCEDED",
             payload:res.data }))
 
          .catch((err)=>{
             dispatch({
                type:"SIGNUP_FAILED",
                payload:err
             })
          })   
    }
 }
export {SignUpResend} 

const accessToken = localStorage.getItem("access token")
console.log(accessToken)
const config={
    headers:{
        "Authorization" : `Bearer ${accessToken}`
    }
}
console.log(config)
const SignUpTwoUser = (data) => {
    return async function (dispatch) {
        // if(condition){
        console.log(accessToken)
        console.log(config)
        dispatch({ type: "SIGNUP_TWO_STARTED" })
        await axios.post("https://twitterbackend-production-93ac.up.railway.app/signup", data, config)
            .then((res) => dispatch({
                type: "SIGNUP_TWO_SUCCEDED",
                payload: res.data
            }))
            .catch((err) => {
                dispatch({
                    type: "SIGNUP_TWO_FAILED",
                    payload: err
                })
            })
        // }
    }
}
export { SignUpTwoUser }

const ResetAction=(data)=>{
    return async function (dispatch){
          dispatch({type:"RESET_STARTED"})
          await axios.post("https://twitterbackend-production-93ac.up.railway.app/resetpassword",data,config)
          .then((res)=>dispatch({
             type:"RESET_SUCCEDED",
             payload:res.data }))
          .catch((err)=>{
             dispatch({
                type:"RESET_FAILED",
                payload:err
             })
          })   
    }
 }
export {ResetAction}

const GoogleAction =()=>{
    return async function (dispatch){
        dispatch({ type: "GOOGLE_STARTED" })
        await axios.get("https://twitterbackend-production-93ac.up.railway.app/auth/google/url/")
            .then((res) => dispatch({
                type: "GOOGLE_SUCCEDED",
                payload: res.data
            }))
            .catch((err) => {
               console.log(err)
            })
       
    }
}
export {GoogleAction}