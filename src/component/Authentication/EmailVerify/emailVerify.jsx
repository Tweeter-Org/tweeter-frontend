import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import ToasterSuccess from '../../Assets/ToasterSuccess'gt;
// import ToasterError from '../../Assets/ToasterError';
import {EmailAction} from '../../../react-redux/actions/authAction';
import { Spinner } from 'react-bootstrap';
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import {SignUpResend} from '../../../react-redux/actions/authAction';
// import SpinnerLoad from '../../Assets/Spinner';
import "../ForgotPassword/fgtPwd.css"

function AuthOtp(){

    const email = sessionStorage.getItem("signupemail")

    const [seconds, setSeconds] = useState(59)
    const [otp, setOtp] = useState("")
    useEffect(()=>{
        const timer=
        seconds >0 && setInterval(()=>{
            setSeconds(seconds-1)
        },1000)
        return ()=> clearInterval(timer)
    },[seconds])
    useEffect(()=>{
        if(seconds!=0)
        document.getElementsByClassName("resendFgtOtp")[0].style.opacity="0.5";
        else
        document.getElementsByClassName("resendFgtOtp")[0].style.opacity="1";
    },[seconds])

    const dispatch = useDispatch();
    const data={
        email,
        otp
    }

    const otpR= useSelector((o)=>o.AuthReducer)
    console.log(otpR)
    const {loading, response, error,toSignUpTwo} = otpR;
    console.log(loading,response,error)
    const [toastBool, setToastBool] = useState(false)

    useEffect(()=>{
        if(loading===true){
            document.body.style.opacity = 0.5;
        }
        else{
            document.body.style.opacity = 1;
        }
    },[loading])

    function EMAILVERIFY (){
        dispatch(EmailAction(data))
    }

    useEffect(()=>{
        console.log(toastBool, loading)
        if(error!="" && !loading){
            console.log(error)
            setToastBool(true)
        }
    },[otpR])
    
    useEffect(()=>{
        console.log(toastBool)
        if(toastBool){
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "light",
                });
                setToastBool(false)
            }
    },[toastBool])

    useEffect(()=>{
        if(response!==""){
            toast.success(`${response}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[response])

   
    const navigate=useNavigate();
    useEffect(()=>{
        if(toSignUpTwo){
            navigate("/signuptwo")
        }
    },[ toSignUpTwo])
    
return <>
<Background />
<div className='loginBg'>
    <img src={arrow} id="arrow" onClick={()=>{navigate("/signup")}} />
    <p className='authHead' id="authHeadTwo">Email Verification</p>
    <p className='authEmail'>Enter Otp sent to {email}</p>
    <input type="text" className="authEmailInput" id="otpInput" placeholder="0  0  0  0  0  0" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
    <p className='invalidEmail'>Incorrect Otp</p>
    <p className='resendFgtOtp' disabled={seconds!==0?true:false} onClick={()=>{dispatch(SignUpResend(email),setSeconds(59))}}>Resend Otp in</p>
    <span id="timer">00:{seconds}</span>
    <button className='authFgtPwdBtn' onClick={()=>{EMAILVERIFY()}} >Continue</button>
    </div>             
    {/* {loadEm===true?<Spinner animation="border" variant="light" id="loadSpinner" />:null}    */}
    <ToastContainer />                                                                                                  
    {loading===true?<Spinner animation="border" variant="light" id="loadSpinner" />:null}
</>
}

export default AuthOtp;