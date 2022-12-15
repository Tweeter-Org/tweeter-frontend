import React from 'react'
import "./fgtPwd.css"
import fgtPwdImg from "../../Assets/fgtPwdImage.svg";

function ForgotPwd(){
return <>
    <div className='authOuterBg'>
    <img src={fgtPwdImg} id="fgtPwdImage" />
    <p className='authHead'>Forgot Password</p>
    <p className='authFgtHead'>We will send you an Otp on example@gmail.com</p>
    <input type="text" className="authFgtEmailInput" placeholder="Enter your email"/>
    <p className='invalidFgtEmail'>Invalid Email Address</p>
    <button className='authFgtPwdBtn'>Continue</button>
    </div>
</>
}

export default ForgotPwd;