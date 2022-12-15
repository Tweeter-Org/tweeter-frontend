import React from 'react'
import "./otp.css";
import otpImage from "../../Assets/otpImage.svg";

function AuthOtp(props){
return <>
    <div className='authOuterBg'>
    <img src={otpImage} id="otpimage"/>
    <p className='authHead'>{props.title} Verification</p>
    <p className='authFgtHead'>Enter Otp sent to example@gmail.com</p>
    <input type="text" className="authFgtEmailInput" placeholder="0 0 0 0"/>
    <p className='invalidFgtEmail'>Incorrect Otp</p>
    <p className='resendFgtOtp'>Resend Otp</p>
    <button className='authFgtPwdBtn'>Continue</button>
    </div>
</>
}

export default AuthOtp;