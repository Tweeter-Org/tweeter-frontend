import React from 'react'
import "./resetPwd.css";
import ResetImg from "../../Assets/RstPwdImg.svg";

function ResetPwd(){
return <>
    <div className='authOuterBg'>
    {/* <img src={ResetImg} id="rstPwdImg" /> */}
    <p className='authHead'>Reset Password</p>
    <p className='authEmail'>New Password</p>
    <input type="text" className="authEmailInput" placeholder="Password"/>
    <p className='invalidPwd'>Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters</p>
    <p className='authRstPwd'>Confirm Password</p>
    <input type="text" id="authRstCfmPwd" className="authPwdInput" placeholder="Password"/>
    <p className='fgtRstPwd'>Password and confirm password should match</p>
    <button className='authRstFgtPwdBtn'>Continue</button>
    </div>
</>
}

export default ResetPwd;