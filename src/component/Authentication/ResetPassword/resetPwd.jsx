import React, { useEffect, useState } from 'react'
import "./resetPwd.css";
import lockIcon from "../../Assets/lock.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import { useDispatch, useSelector } from 'react-redux';
// import ResetPassword from '../../../react-redux/actions/ResetPwdAction';
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
      document.getElementsByClassName("invalidPwd")[0].style.display = "none";
      setIsPass(true)
      console.log("true");
    } else if (pass) {
      document.getElementsByClassName("invalidPwd")[0].style.display = "none";
      setIsPass(false)
    }
  }, [pass]);

  useEffect(() => {
    if (pass == cPass) {
      setIsCPass(true)
      document.getElementsByClassName("fgtRstPwd")[0].style.display = "none";
    }
    else {
      setIsCPass(false)
      document.getElementsByClassName("fgtRstPwd")[0].style.display = "block";
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

  function RESETPWD() {
    dispatch(ResetAction(pass), console.log(pass))
    if (error !== "") {
      toast.error(`${error}`, {
        position: "top-center",
        theme: "light",
      });
    }
    if (response !== "") {
      toast.success(`${response}`, {
        position: "top-center",
        theme: "light",
      });
    }
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
    if(error!==""){
        toast.error(`${error}`, {
            position: "top-center",
            theme: "light",
            });
    }
  },[error])

  useEffect(()=>{
    if(response!==""){
        toast.success(`${response}`, {
            position: "top-center",
            theme: "light",
            });
    }
  },[response])
  const navigate = useNavigate();
  useEffect(() => {
    if (toHome) {
      navigate("/")
    }
  }, [toHome])

  return <>
    <Background />
    <div className='loginBg' id="resetBack">
      <img src={arrow} id="arrow" onClick={() => { navigate("/otp") }} />
      <p className='authHead' id="authreset">Reset Password</p>
      <p className='authEmail' id="resetPwdHead">New Password</p>
      <img src={lockIcon} id="rstLock1" />
      {show1 ? (
        <FontAwesomeIcon icon={faEye} id="LEye1" onClick={handleShow1} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} id="LEye1" onClick={handleShow1} />
      )}
      <input type={show1 ? "text" : "password"} className="authEmailInput" id="resetPwdHeadInput" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <p className='invalidPwd' id="resetpwd1">Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters</p>
      <p className='authRstPwd'>Confirm Password</p>
      <img src={lockIcon} id="rstLock2" />
      {show2 ? (
        <FontAwesomeIcon icon={faEye} id="LEye2" onClick={handleShow2} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} id="LEye2" onClick={handleShow2} />
      )}
      <input type={show2 ? "text" : "password"} id="authRstCfmPwd" className="authPwdInput" placeholder="Password" value={cPass} onChange={(e) => setCPass(e.target.value)} />
      <p className='fgtRstPwd'>Password and confirm password should match</p>
      <button className='authRstFgtPwdBtn authSignIn' onClick={() => { RESETPWD() }} >Continue</button>
    </div>
    {loading === true ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
    <ToastContainer />
  </>
}

export default ResetPwd;