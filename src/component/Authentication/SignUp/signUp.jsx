import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {SignUpUser} from '../../../react-redux/actions/authAction';
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

function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [checkEmail, setCheckEmail] = useState(false)
    const [checkName, setCheckName] = useState(false)
    const [callApi, setCallApi] = useState(false)
    const rightemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(()=>{
        if(rightemail.test(email)){
            document.getElementsByClassName('signInvalidEmail')[0].style.display="none";
            setCheckEmail(true)
        }
        else if(email){
            document.getElementsByClassName('signInvalidEmail')[0].style.display="block";
            setCheckEmail(false)
        }
    },[email])
    
   const rightname = /^[a-z ,.'-]+$/i;
    useEffect(()=>{
        if(rightname.test(name)){
            document.getElementById('signName').style.display="none";
            setCheckName(true)
        }
        else if(name){
            document.getElementById('signName').style.display="block";
            setCheckName(false)
        }
    },[name])

    const dispatch= useDispatch();
    useEffect(()=>{
        if(checkEmail && checkName) setCallApi(true);
        else setCallApi(false)

    },[checkEmail,checkName])

    const responseApi = useSelector((state)=>state.AuthReducer)
            const {loading, response, error, toSignOtp} = responseApi

            function SIGNUP(){
                dispatch(SignUpUser(email, callApi),sessionStorage.setItem("signupemail",email), sessionStorage.setItem("NameToBeUsed",name))
                if(error!==""){
                    toast.error(`${error}`, {
                        position: "top-center",
                        theme: "light",
                        });
                }
                // if(response!==""){
                //     toast.success(`${response}`, {
                //         position: "top-center",
                //         theme: "light",
                //         });
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

    const navigate = useNavigate();
   
   
    useEffect(()=>{
        if(response!==""){
            toast.success(`${response}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[response])

    useEffect(()=>{
        if( toSignOtp){
            navigate("/verifyemail")
        }
    },[ toSignOtp])
  
return <>
{/* <ToasterError error={error} /> */}
<Background />
<div className='loginBg' id="signUpBlock">
    <img src={arrow} id="arrow" onClick={()=>{navigate("/")}}/>
    <p className='authHead' id="authreset">Sign Up</p>
    <p className='authEmail' id="resetPwdHead">Name</p>
    <input type="text" className="authEmailInput" id="resetPwdHeadInput" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
    <p id="signName">Name should consists of alphabet</p>
    <img src={emailIcon} id="emailIconS" />
    <p className='authPwd' id="signEmail">Email Address</p>
    <input type="text" className="authPwdInput" id="signEmailInput" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <p className='signInvalidEmail'>Invalid Email Address</p>
    <button type="button" className='authSignIn' id="signUpBtn" onClick={()=>{SIGNUP()}}>Sign Up</button>
    </div>
    {loading===true?<Spinner animation="border" variant="light" id="loadSpinner" />:null}
    <ToastContainer />
</>
}

export default SignUp