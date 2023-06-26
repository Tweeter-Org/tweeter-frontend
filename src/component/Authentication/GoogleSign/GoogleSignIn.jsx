import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from '../Background';
import arrow from "../../Assets/arrow-back.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import lockIcon from "../../Assets/lock.svg";
import nameIcon from "../../Assets/authName.svg"
import { useState, useEffect } from "react";
import "./googleSign.css";
import { useDispatch, useSelector } from "react-redux";
import { SignUpTwoUser } from "../../../react-redux/actions/authAction";
import { Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function GoogleSignin() {
  const userName =  sessionStorage.getItem("Google_name")
  const signUp = useSelector((s) => s.AuthReducer)
  const { loading, error, name2, username2 , response, toHome } = signUp;
  const [toastBool, setToastBool] = useState(false)

  const [nameN, setNameN] = useState(username2)
  const [name, setName] = useState(name2)
  const [pass, setPass] = useState("")
  const [checkName, setCheckName] = useState(false);
  const [checkPass, setCheckPass] = useState(false)
  const [show1, setShow1] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [callApi, setCallApi] = useState(false)
  function handleShow1() {
    setShow1(!show1)
  }

  const rightname1 = /^[a-z,.'-]+$/i;
  const rightname2 = /^[a-z ,.'-]+$/i;
  useEffect(() => {
    if (rightname1.test(nameN)) {
      document.getElementById('googleInvalidName2').style.display = "none";
      setCheckName(true)
    }
    else if (nameN) {
      document.getElementById('googleInvalidName2').style.display = "block";
      setCheckName(false)
    }
  }, [nameN])
  useEffect(() => {
    if (rightname2.test(name)) {
      document.getElementById('googleInvalidName').style.display = "none";
      setCheckName(true)
    }
    else if (name) {
      document.getElementById('googleInvalidName').style.display = "block";
      setCheckName(false)
    }
  }, [name])


  const rightpass =
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#])[A-Za-z\d@$!%?&#]{8,}$/;
  useEffect(() => {
    if (rightpass.test(pass)) {
      document.getElementById("googleInvalidPwd").style.display = "none";
      setCheckPass(true)
   
    } else if (pass) {
      document.getElementById("googleInvalidPwd").style.display = "block";
      setCheckPass(false)
    }
  }, [pass]);

  useEffect(() => {
    if (checkName && checkPass)
      setCallApi(true);
    else
      setCallApi(false)
  }, [checkName, checkPass])

  const data = {
    name:name,
    user_name: nameN,
    password: pass
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (loading === true) {
      document.body.style.opacity = 0.5;
    }
    else {
      document.body.style.opacity = 1;
    }
  }, [loading])

  function SIGNUPTWO() {
    dispatch(SignUpTwoUser(data))
    setShowErr(true)
  }

  useEffect(()=>{
    if(error!="" && !loading){
        setToastBool(true)
    }
},[signUp])

useEffect(()=>{
   
    if(toastBool && showErr){
            toast.error(`{error}`, {
                position: "top-center",
                theme: "light",
            });
            setToastBool(false)
        }
},[toastBool])

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
    <div className='loginBg'>
      <p className='authHead' id="authSignTwo">Sign Up</p>
      <p className='authEmail' id="sign2Name">Full Name</p>
      <img src={nameIcon} id="emailIcon" />
      <input type="text" className="authEmailInput" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <p id="googleInvalidName" className="invalidEmail">Name should consists of alphabets</p>
      <img src={nameIcon} id="nameIcon"  />
      <p className='authPwd' id="sign2Username">Username</p>
      <input type="text" className="authEmailInput" placeholder="Enter your name" value={nameN} onChange={(e) => setNameN(e.target.value)} />
      <p id="googleInvalidName2" className="invalidEmail">Name should not contain any whitespaces</p>
      <img src={lockIcon} id="lockIconS" />
      <p className='authPwd' id="googlePass">Password</p>
      {show1 ? (
        <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} id="LEye" onClick={handleShow1} />
      )}
      <input type={show1 ? "text" : "password"} className="authPwdInput" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <p className='invalidEmail' id="googleInvalidPwd">Password must be 1 uppercase 1 lowercase 1 number 1 special digit character and 8 or more characters</p>
      <button type="button" className='authFgtPwdBtn' id="googleBtn" onClick={() => { SIGNUPTWO() }}>Sign Up</button>
    </div>
    {loading === true ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
    <ToastContainer />
  </>
}
export default GoogleSignin;