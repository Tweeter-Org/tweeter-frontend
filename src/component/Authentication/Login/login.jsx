import React, { useEffect, useRef, useState } from 'react'
import "./login.css";
import emailIcon from "../../Assets/email.svg";
import googleIcon from "../../Assets/google.svg";
import lockIcon from "../../Assets/lock.svg";
import LogInUser from '../../../react-redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToasterError from '../../Assets/ToasterError';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Background from '../Background';
import axios from 'axios';
import { GoogleAction } from '../../../react-redux/actions/authAction';

function Login() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthEmail, setIsAuthEmail] = useState(false)
    const [show, setShow] = useState(false)
    function handleShow() {
        setShow(!show)
    }
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        if (checkEmail.test(email)) {
            document.getElementById("loginInvEmail").style.display = "none";
            setIsAuthEmail(true)
        }
        else if (email) {
            document.getElementById("loginInvEmail").style.display = "block";
            setIsAuthEmail(false)
        }
    }, [email])

    const data = {
        email,
        password
    }

    const loginState = useSelector((state) => state.AuthReducer)
    const { loading, toFgtPwd} = loginState;
    const [toastBool, setToastBool] = useState(false)
    const {error, response} = loginState
    const navigate = useNavigate();

//google authentication
const googleRed = useSelector((g)=>g.GoogleReducer)
    const {loadingGoogle, responseGoogle} = googleRed

    function LOGIN(){
        dispatch(LogInUser(data, isAuthEmail)) 
    }

    useEffect(()=>{
        if(error!="" && !loading){
            setToastBool(true)
        }
    },[loginState])

    useEffect(()=>{
        if(toastBool){
                toast.error("Wrong Password", {
                    position: "top-center",
                    theme: "light",
                });
                setToastBool(false)
            }
    },[toastBool])


    useEffect(() => {
        if (loading === true || loadingGoogle===true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading, loadingGoogle])


    useEffect(()=>{
        if(toFgtPwd){
            navigate("/")
        }
    },[toFgtPwd])
    
    const [googleBool, setGoogleBool] = useState(false)
    function navigateGoogle (){
        dispatch(GoogleAction())
        // if(responseGoogle!="")
        // window.location.href = `${responseGoogle}`
    }

    useEffect(()=>{
        if(responseGoogle!="" && !loadingGoogle){
            setGoogleBool(true)
        }
    },[googleRed])

    useEffect(()=>{
        if(googleBool){
            window.location.href = `${responseGoogle}`
                setGoogleBool(false)
            }
    },[googleBool])

    const isUser = localStorage.getItem("access token") ? true : false;
    console.log(isUser)
    useEffect(()=>{
        if(isUser)
        navigate("/")
    },[isUser])


    return <>
     <Background />
    <div className='AUTHENTICATION'>
       
        <div className='loginBg'>
            <p className='authHead'>Sign In</p>
            <p className='authEmail'>Email Address</p>
            <img src={emailIcon} id="emailIcon" />
            <input type="text" className="authEmailInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            <p className='invalidEmail' id="loginInvEmail">Invalid Email Address</p>
            <p className='authPwd'>Password</p>
            <img src={lockIcon} id="lockIcon" />
            {show ? (
                <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow} />
            ) : (
                <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow} />
            )}
            <input type={show ? "text" : "password"} className="authPwdInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <p className='fgtPwd' onClick={() => navigate("/fgtpwd")}>Forgot Password?</p>
            {/* <button className='authSignIn' onClick={()=>{dispatch(SignInUser(data))}}>Sign In</button>  */}
            <button className='authSignIn' id="loginButton" onClick={() => {LOGIN()}}>Sign In</button>
            <hr id="hrOr" />
            <button className='contGoogle' onClick={navigateGoogle} ><img src={googleIcon} className="googleIcon" />Continue with Google</button>
            <p className='createAcc'>New to Tweeter? <span className="authSignUp" onClick={() => navigate("/signup")}>Create Account</span></p>
        </div>
        {(loading === true || loadingGoogle===true) ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
        <ToastContainer />
        </div>
    </>
}

export default Login;