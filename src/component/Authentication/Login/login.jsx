import React, { useEffect, useRef, useState } from 'react'
import "./login.css";
import loginImage from "../../Assets/loginImage.svg";
import  LogInUser from "./action"
// import SignInUser from "../../../redux/features/SignIn";
import { useDispatch, useSelector } from 'react-redux';

function Login(){
   const dispatch = useDispatch();
    const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
    const [isAuthEmail , setIsAuthEmail] = useState(false)
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(()=>{
        if(checkEmail.test(email)){
            document.getElementsByClassName("invalidEmail")[0].style.display ="none";
            setIsAuthEmail(true)
        }
        else if(email){
            document.getElementsByClassName("invalidEmail")[0].style.display ="block";
            setIsAuthEmail(false)
        }
    },[email])
   const data ={
    email,
    password
   }
   console.log(data)

   const statea = useSelector((state)=>state.rootReducer)
   console.log(statea)
return <>
    <div className='authOuterBg'>
    <img src={loginImage} id="loginImage"/>
    <p className='authHead'>Sign In</p>
    <p className='authEmail'>Email Address</p>
    <input type="text" className="authEmailInput" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
    <p className='invalidEmail'>Invalid Email Address</p>
    <p className='authPwd'>Password</p>
    <input type="text" className="authPwdInput" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
    <p className='fgtPwd'>Forgot Password?</p>
    <button className='authSignIn' onClick={()=>{dispatch(LogInUser(data,isAuthEmail))}}>Sign In</button>
    <button className='authSignUp'>Sign Up</button>
    </div>
</>
}

export default Login;