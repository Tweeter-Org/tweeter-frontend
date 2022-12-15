import React from 'react'
import otpImage from "../../Assets/otpImage.svg";

function EmailVerify(){
return <>
    <div className='authOuterBg'>
    <img src={otpImage} id="otpimage"/>
    <p className='authHead'>Email Verification</p>
    <p className='authFgtHead'>Email Address</p>
    <input type="text" className="authFgtEmailInput" placeholder="Enter your email"/>
    <p className='invalidFgtEmail'>Invalid Email Address</p>
    <button className='authFgtPwdBtn'>Continue</button>
    </div>
</>
}

export default EmailVerify;