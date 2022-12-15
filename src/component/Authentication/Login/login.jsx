import React, { useState } from 'react'
import "./login.css";
import loginImage from "../../Assets/loginImage.svg";

function Login(){
    const [isAuthEmail , setIsAuthEmail] = useState("false")
return <>
    <div className='authOuterBg'>
    <img src={loginImage} id="loginImage"/>
    <p className='authHead'>Sign In</p>
    <p className='authEmail'>Email Address</p>
    <input type="text" className="authEmailInput" placeholder="Enter your email"/>
    <p className='invalidEmail'>Invalid Email Address</p>
    <p className='authPwd'>Password</p>
    <input type="text" className="authPwdInput"  placeholder="Password"/>
    <p className='fgtPwd'>Forgot Password?</p>
    <button className='authSignIn'>Sign In</button>
    <button className='authSignUp'>Sign Up</button>
    </div>
</>
}

export default Login;