import React, { useEffect, useRef, useState } from 'react'
import "./login.css";
import emailIcon from "../../Assets/email.svg";
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
    const { loading, response, error, toFgtPwd} = loginState;
    const navigate = useNavigate();

//google authentication
    const {loadingGoogle, responseGoogle} = useSelector((g)=>g.GoogleReducer)

    function LOGIN(){
        dispatch(LogInUser(data, isAuthEmail)) 
        if (error != "") {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
            });
        }
    }

    useEffect(()=>{
        if(error!==""){
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[error])
    useEffect(() => {
        if (loading === true || loadingGoogle===true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading, loadingGoogle])

    // const [displayToaster, setDisplayToaster] = useState(false)
    // useEffect(() => {
    //     let mounted = true;
    //                 if (mounted) {
    //             setDisplayToaster(true)
    //         }
       
    //     return function cleanup() {
    //         mounted = false;
    //     }
    // }, [])

    // useEffect(() => {
    //     if(displayToaster){
    //         if (response != "") {
    //             toast.success(`${response}`, {
    //                 position: "top-center",
    //                 theme: "light",
    //             });
    //         }
    //         if (error != "") {
    //             toast.error(`${error}`, {
    //                 position: "top-center",
    //                 theme: "light",
    //             });
    //         }
    //     }  
    // },[displayToaster])

    useEffect(()=>{
        if(toFgtPwd){
            navigate("/home")
        }
    },[toFgtPwd])
    
    useEffect(()=>{
        if(responseGoogle!="")
        window.location.href = `${responseGoogle}`
    },[responseGoogle])

    return <>
        <Background />
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
            <button className='contGoogle' onClick={()=>{dispatch(GoogleAction())}} >Continue with Google</button>
            <p className='createAcc'>New to Tweeter? <span className="authSignUp" onClick={() => navigate("/signup")}>Create Account</span></p>
        </div>
        {(loading === true || loadingGoogle===true) ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
        <ToastContainer />
    </>
}

export default Login;