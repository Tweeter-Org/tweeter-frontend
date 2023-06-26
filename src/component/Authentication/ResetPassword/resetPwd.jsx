import React, { useEffect, useState } from 'react'
import "./resetPwd.css";
import lockIcon from "../../Assets/lock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ResetAction } from '../../../react-redux/actions/authAction';

function ResetPwd() {
  const [pass, setPass] = useState("")
  const [cPass, setCPass] = useState("")
  const [isPass, setIsPass] = useState(false)
  const [isCPass, setIsCPass] = useState(false)
  const [callApi, setCallApi] = useState(false)
  const [show1, setShow1] = useState(false)
  const [showErr, setShowErr] = useState(false)
  function handleShow1() {
    setShow1(!show1)
  }
  const [show2, setShow2] = useState(false)
  function handleShow2() {
    setShow2(!show2)
  }
  const rightpass =
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;
  useEffect(() => {
    if (rightpass.test(pass)) {
      document.getElementById("resetpwd1").style.display = "none";
      setIsPass(true)
    } else if (pass) {
      document.getElementById("resetpwd1").style.display = "block";
      setIsPass(false)
    }
  }, [pass]);

  useEffect(() => {
    if (pass == cPass) {
      setIsCPass(true)
      document.getElementById("resetPass2").style.display = "none";
    }
    else {
      setIsCPass(false)
      document.getElementById("resetPass2").style.display = "block";
    }
  }, [cPass])

  useEffect(() => {
    if (isPass && isCPass)
      setCallApi(true)
    else
      setCallApi(false)
  }, [isPass, isCPass])

  const dispatch = useDispatch();

  const reset = useSelector((R) => R.AuthReducer)
  const { loading, response, error, toHome } = reset;
  const [toastBool, setToastBool] = useState(false)

  function RESETPWD() {
    dispatch(ResetAction(pass))
    setShowErr(true)
  }

  useEffect(()=>{
    if(error!="" && !loading){
        setToastBool(true)
    }
},[reset])

useEffect(()=>{
    if(toastBool && showErr){
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
            });
            setToastBool(false)
        }
},[toastBool])

    useEffect(()=>{
      if(loading===true){
          document.body.style.opacity = 0.5;
      }
      else{
          document.body.style.opacity = 1;
      }
  },[loading])

  const navigate = useNavigate();
  useEffect(() => {
    if (toHome) {
      navigate("/login")
    }
  }, [toHome])

  return <>
    <Background />
    <div className='loginBg'>
      <img src={arrow} id="arrow" onClick={() => { navigate("/otp") }} />
      <p className='authHead'id="authHeadTwo">Reset Password</p>
      <p className='authEmail' id="resetInput">New Password</p>
      <img src={lockIcon} id="lockIcon" />
      {show1 ? (
        <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
      )}
      <input type={show1 ? "text" : "password"} className="authEmailInput" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <p className='invalidEmail' id="resetpwd1">Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters</p>
      <p className='authPwd'>Confirm Password</p>
      <img src={lockIcon} id="lockIcon" />
      {show2 ? (
        <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow2} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow2} />
      )}
      <input type={show2 ? "text" : "password"} className="authPwdInput" placeholder="Password" value={cPass} onChange={(e) => setCPass(e.target.value)} />
      <p className='fgtRstPwd' id="resetPass2">Password and confirm password should match</p>
      <button className='authFgtPwdBtn' onClick={() => { RESETPWD() }} >Continue</button>
    </div>
    {loading === true ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
    <ToastContainer />
  </>
}

export default ResetPwd;