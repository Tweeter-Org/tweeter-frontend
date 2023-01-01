import React, { useEffect, useRef, useState } from 'react'
import "./fgtPwd.css"
import fgtPwdImg from "../../Assets/fgtPwdImage.svg";
import { useDispatch, useSelector } from 'react-redux';
import {FgtPwdAction} from '../../../react-redux/actions/authAction';
import { Spinner } from 'react-bootstrap';
import emailIcon from "../../Assets/email.svg";
import { useNavigate } from 'react-router-dom';
import ToasterError from '../../Assets/ToasterError';
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPwd(){

    const [email, setEmail] = useState("")
    const [checkEmail, setCheckEmail] = useState(false)
    const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(()=>{
        if(rightemail.test(email)){
            document.getElementsByClassName('invalidFgtEmail')[0].style.display="none";
            setCheckEmail(true)
        }
        else if(email){
            document.getElementsByClassName('invalidFgtEmail')[0].style.display="block";
            setCheckEmail(false)
        }
    })
    const dispatch= useDispatch();

    const state= useSelector((s)=>s.AuthReducer)
    const {loading, response, error, toOtp} = state;
    const navigate = useNavigate();

    function FORGOTPWD (){
        dispatch(FgtPwdAction(email, checkEmail),localStorage.setItem("email",email))
        // if (response != "") {
        //     toast.success(`${response}`, {
        //         position: "top-center",
        //         theme: "light",
        //     });
        // }
        // if (error != "") {
        //     toast.error(`${error}`, {
        //         position: "top-center",
        //         theme: "light",
        //     });
        // }

    }


    useEffect(()=>{
        if(loading===true){
            document.body.style.opacity = 0.5;
        }
        else{
            document.body.style.opacity = 1;
        }
    },[loading])
    useEffect(()=>{
        if(response!==""){
            toast.success(`${response}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[response])

    useEffect(()=>{
        if(error!==""){
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[error])

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
        if(toOtp){
            navigate("/otp")
        }
    },[toOtp])

return <>
    <Background />
    <div className='FgtPwdBg'>
    <img src={arrow} id="arrow" onClick={()=>{navigate("/")}} />
    <p className='authHead' id="authHeadTwo">Forgot Password</p>
    <p className='authFgtHead'>We will send you an Otp on example@gmail.com</p>
    <img src={emailIcon} id="emailIconFgt" />
    <input type="text" className="authFgtEmailInput" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    <p className='invalidFgtEmail'>Invalid Email Address</p>
    <button className='authFgtPwdBtn' onClick={()=>{FORGOTPWD()}}>Continue</button>
    </div>
    {loading===true?<Spinner animation="border" variant="light" id="loadSpinner" />:null}
    <ToastContainer />
</>
}

export default ForgotPwd;