import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SignUpUser } from '../../../react-redux/actions/authAction';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signUp.css";
import { useNavigate } from 'react-router-dom';
import ToasterError from '../../Assets/ToasterError';
import emailIcon from "../../Assets/email.svg";
import lockIcon from "../../Assets/lock.svg";
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [checkEmail, setCheckEmail] = useState(false)
    const [checkName, setCheckName] = useState(false)
    const [callApi, setCallApi] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(() => {
        if (rightemail.test(email)) {
            document.getElementById('signInvalidEmail').style.display = "none";
            setCheckEmail(true)
        }
        else if (email) {
            document.getElementById('signInvalidEmail').style.display = "block";
            setCheckEmail(false)
        }
    }, [email])

    const rightname = /^[a-z ,.'-]+$/i;
    useEffect(() => {
        if (rightname.test(name)) {
            document.getElementById('signName').style.display = "none";
            setCheckName(true)
        }
        else if (name) {
            document.getElementById('signName').style.display = "block";
            setCheckName(false)
        }
    }, [name])

    const dispatch = useDispatch();
    useEffect(() => {
        if (checkEmail && checkName) setCallApi(true);
        else setCallApi(false)

    }, [checkEmail, checkName])

    const responseApi = useSelector((state) => state.AuthReducer)
    const { loading, response, error, toSignOtp } = responseApi
    const [bool, setBool] = useState(false)

    function SIGNUP(e) {
        e.preventDefault();
        dispatch(SignUpUser(email, callApi), sessionStorage.setItem("signupemail", email), sessionStorage.setItem("NameToBeUsed", name))
        setShowErr(true)
        setBool(true)
    }

    useEffect(() => {
        if (error && !loading && showErr) {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
            });
            setShowErr(false)
        }
    }, [showErr, loading, error])

    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    const navigate = useNavigate();

    useEffect(() => {
        if (toSignOtp && bool) {
            navigate("/verifyemail")
            setBool(false)
        }
    }, [toSignOtp, bool])

    return <>
        {/* <ToasterError error={error} /> */}
        <Background />
        <form onSubmit={SIGNUP}>
        <div className='loginBg'>
            <img src={arrow} id="arrow" onClick={() => { navigate("/") }} />
            <p className='authHead'>Sign Up</p>
            <p className='authEmail' id="signName1">Name</p>
            <input type="text" className="authEmailInput" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
            <p id="signName" className='invalidEmail'
            >Name should consists of alphabet</p>
            <img src={emailIcon} className='emailSignIcon' />
            <p className='authPwd' id="signEmail">Email Address</p>
            <input type="text" className="authPwdInput" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <p className='fgtRstPwd' id="signInvalidEmail">Invalid Email Address</p>
            <button type="submit" className='authSignIn authFgtPwdBtn' id="loginButton">Sign Up</button>
        </div>
        </form>
        {loading === true ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default SignUp