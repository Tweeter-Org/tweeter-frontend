import React from 'react'
import loginImage from "../../Assets/loginImage.svg";
import "./signUp.css";
function SignUp(){
return <>
    <div className='authOuterBg'>
    <img src={loginImage} id="loginImage"/>
    <p className='authHead'>Sign Up</p>
    <p className='authEmail'>Name</p>
    <input type="text" className="authEmailInput" placeholder="Enter your name"/>
    <p className='invalidEmail' id="signName">Name should consists of alphabet</p>
    <p className='authPwd'>Email Address</p>
    <input type="text" className="authPwdInput"  placeholder="Enter your email"/>
    <p className='signInvalidEmail'>Invalid Email Address</p>
    <p className='signPwd'>Password</p>
    <input type="text" className="signPwdInput"  placeholder="Password"/>
    <p className='invalidPwd' id="signInvalidPwd">Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters</p>
    <button type="button" className='authSignIn' id="signUpBtn">Sign Up</button>
    </div>
</>
}

export default SignUp