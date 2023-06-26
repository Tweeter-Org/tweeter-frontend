import React, { useEffect, useState } from 'react'
import "./otp.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { OtpAction } from '../../../react-redux/actions/authAction';
import { Spinner } from 'react-bootstrap';
import arrow from "../../Assets/arrow-back.svg";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ToasterSuccess from '../../Assets/ToasterSuccess';
import ToasterError from '../../Assets/ToasterError';
import Background from '../Background';
import { ResendOtpAction } from '../../../react-redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthOtp() {

    const email = sessionStorage.getItem("email")

    const [seconds, setSeconds] = useState(59)
    const [showErr, setShowErr] = useState(false)
    const [otp, setOtp] = useState("")
    useEffect(() => {
        const timer =
            seconds > 0 && setInterval(() => {
                setSeconds(seconds - 1)
            }, 1000)
        return () => clearInterval(timer)
    }, [seconds])
    useEffect(() => {
        if (seconds != 0)
            document.getElementsByClassName("resendFgtOtp")[0].style.opacity = "0.5";
        else
            document.getElementsByClassName("resendFgtOtp")[0].style.opacity = "1";
    }, [seconds])

    const dispatch = useDispatch();
    const data = {
        email,
        otp
    }

    const otpR = useSelector((o) => o.AuthReducer)
    const { loading, response, error, toRstPwd } = otpR;
    const [toastBool, setToastBool] = useState(false)

    const navigate = useNavigate();

    function OTP() {
        dispatch(OtpAction(data, navigate))
        setShowErr(true)
    }

    useEffect(() => {
        if (error != "" && !loading) {
            setToastBool(true)
        }
    }, [otpR])

    useEffect(() => {
        if (toastBool && showErr) {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
            });
            setToastBool(false)
        }
    }, [toastBool])

    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    useEffect(() => {
        if (toRstPwd) {
            navigate("/reset")
        }
    }, [toRstPwd])
    
    return <>
        <Background />
        <div className='loginBg'>
            <img src={arrow} id="arrow" onClick={() => { navigate("/fgtpwd") }} />
            <p className='authHead' id="authHeadTwo">Otp Verification</p>
            <p className='authEmail'>Enter Otp sent to {email}</p>
            <input type="text" className="authEmailInput" id="otpInput" placeholder="0  0  0  0  0  0" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <p className='invalidEmail'>Incorrect Otp</p>
            <p className='resendFgtOtp' disabled={seconds !== 0 ? true : false} onClick={() => { dispatch(ResendOtpAction(email), setSeconds(59)) }}>Resend Otp</p>
            <span id="timer">00:{seconds}</span>
            <button className='authFgtPwdBtn' onClick={() => { OTP() }}>Continue</button>
        </div>
        <ToastContainer />
        {(loading === true) ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
    </>
}

export default AuthOtp;