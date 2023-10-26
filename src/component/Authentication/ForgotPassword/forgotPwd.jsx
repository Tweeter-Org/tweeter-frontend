import React, { useEffect, useRef, useState } from 'react'
import "./fgtPwd.css"
import fgtPwdImg from "../../Assets/fgtPwdImage.svg";
import { useDispatch, useSelector } from 'react-redux';
import { FgtPwdAction } from '../../../react-redux/actions/authAction';
import { Spinner } from 'react-bootstrap';
import emailIcon from "../../Assets/email.svg";
import { useNavigate } from 'react-router-dom';
import ToasterError from '../../Assets/ToasterError';
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPwd() {

    const [email, setEmail] = useState("")
    const [showErr, setShowErr] = useState(false)
    const [checkEmail, setCheckEmail] = useState(false)
    const [bool, setBool] = useState(false)
    const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(() => {
        if (rightemail.test(email)) {
            document.getElementById('fgtEmail').style.display = "none";
            setCheckEmail(true)
        }
        else if (email) {
            document.getElementById('fgtEmail').style.display = "block";
            setCheckEmail(false)
        }
    })
    const dispatch = useDispatch();

    const state = useSelector((s) => s.AuthReducer)
    const { loading, response, error, toOtp } = state;
    const navigate = useNavigate();

    function FORGOTPWD(e) {
        e.preventDefault();
        dispatch(FgtPwdAction(email, checkEmail), sessionStorage.setItem("email", email))
        setShowErr(true)
        setBool(true)
    }

    useEffect(() => {
        if (error && !loading && showErr) {
            toast.error(error, {
                position: "top-center",
                theme: "light",
            });
            setShowErr(false)
        }
    }, [state, showErr])


    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    useEffect(() => {
        if (toOtp && bool) {
            navigate("/otp")
            setBool(false)
        }
    }, [toOtp, bool])

    return <>
        <Background />
        <form onSubmit={FORGOTPWD}>
        <div className='loginBg'>
            <img src={arrow} id="arrow" onClick={() => { navigate("/") }} />
            <p className='authHead' id="authHeadTwo">Forgot Password</p>
            <p className='authEmail'>Enter an email address to recieve OTP</p>
            <img src={emailIcon} id="emailIconFgt" />
            <input type="text" className="authEmailInput" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} required/>
            <p className='invalidEmail' id="fgtEmail">Invalid Email Address</p>
            <button className='authFgtPwdBtn' type="submit">Continue</button>
        </div>
        </form>
        {loading === true ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default ForgotPwd;