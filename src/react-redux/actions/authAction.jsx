import axios from "axios"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import BaseUrl from "./BaseUrl"

const LogInUser = (data, condition) => {
    return async function (dispatch) {
        if (condition) {
            dispatch({ type: "REQUEST_STARTED" })
            await BaseUrl.post(`/login`, data)
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
            dispatch({ type: "FGT_EMAIL_STARTED" })
            await BaseUrl.post(`/forgotpwd`, { email })
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
        await BaseUrl.post(`/forgotpwd/verify`, data)
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
        await BaseUrl.post(`/resendotp`, { email })
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
            await BaseUrl.post(`/email`, { email })
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
        await BaseUrl.post(`/email/verify`, data)
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

const SignUpResend = (email) => {
    return async function (dispatch) {
        dispatch({ type: "SIGNUP_STARTED" })
        await BaseUrl.post(`/email`, { email })
            .then((res) => dispatch({
                type: "SIGNUP_SUCCEDED",
                payload: res.data
            }))
            .catch((err) => {
                dispatch({
                    type: "SIGNUP_FAILED",
                    payload: err
                })
            })
    }
}
export { SignUpResend }

const SignUpTwoUser = (data) => {
    const accessToken = localStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        // if(condition){
        dispatch({ type: "SIGNUP_TWO_STARTED" })
        await BaseUrl.post(`/signup`, data, config)
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

const ResetAction = (password) => {
    const accessToken = localStorage.getItem("otp token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({ type: "RESET_STARTED" })
        await BaseUrl.post(`/resetpassword`, { password }, config)
            .then((res) => dispatch({
                type: "RESET_SUCCEDED",
                payload: res.data
            }))
            .catch((err) => {
                dispatch({
                    type: "RESET_FAILED",
                    payload: err
                })
            })
    }
}
export { ResetAction }

const GoogleAction = () => {
    return async function (dispatch) {
        dispatch({ type: "GOOGLE_STARTED" })
        await BaseUrl.get(`/auth/google/url`)
            .then((res) => {
                dispatch({
                    type: "GOOGLE_SUCCEDED",
                    payload: res.data
                })
            })

            .catch((err) => {
            })

    }
}
export { GoogleAction }

const GoogleTwoAction = (url) => {
    return async function (dispatch) {
        dispatch({ type: "GOOGLE_TWO_STARTED" })
        await BaseUrl.get(`/auth/google?code=${url}`)
            .then((res) => dispatch({
                type: "GOOGLE_TWO_SUCCEDED",
                payload: res
            }))
            .catch((err) => {
                dispatch({
                    type: "GOOGLE_TWO_FAILED",
                    payload: err
                })
            })

    }
}
export { GoogleTwoAction }

export const nameViaGoogle = (name, username) => {
    return {
        type: "NAME_VIA_GOOGLE",
        payload: {
            name, username
        }
    }
}

export const infoViaGoogle = (user) => {
    return {
        type: "INFO_VIA_GOOGLE",
        payload: {
            user
        }
    }
}

export const setLogout = () => {
    return {
        type: "LOG_OUT"
    }
}