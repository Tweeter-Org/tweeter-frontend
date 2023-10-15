import "./resetPwd.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import Background from "../Background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResetAction } from "../../../react-redux/actions/authAction";
import { Spinner } from "react-bootstrap";
import arrow from "../../Assets/arrow-back.svg";
import lockIcon from "../../Assets/lock.svg";
import { useNavigate } from "react-router-dom";

function ResetPwd() {
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [isPass, setIsPass] = useState(false);
  const [isCPass, setIsCPass] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showErr, setShowErr] = useState(false);
  function handleShow1() {
    setShow1(!show1);
  }
  const [show2, setShow2] = useState(false);
  function handleShow2() {
    setShow2(!show2);
  }
  const rightpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;

  useEffect(() => {
    if (rightpass.test(pass)) {
      
      document.getElementById("resetpwd1").style.display = "none";
      setIsPass(true);
    } else if (pass) {
 
      document.getElementById("resetpwd1").style.display = "block";
      setIsPass(false);
    }
  }, [pass]);

  useEffect(() => {
    if (pass == cPass) {
      setIsCPass(true);
      document.getElementById("resetPass2").style.display = "none";
    } else {
      setIsCPass(false);
      document.getElementById("resetPass2").style.display = "block";
    }
  }, [cPass]);

  useEffect(() => {
    if (isPass && isCPass) setCallApi(true);
    else setCallApi(false);
  }, [isPass, isCPass]);

  const dispatch = useDispatch();

  const reset = useSelector((R) => R.AuthReducer);
  const { loading, response, error, toLogin } = reset;
  const [bool, setBool] = useState(false)

  function RESETPWD(e) {
    e.preventDefault();
    dispatch(ResetAction(pass));
    setShowErr(true);
    setBool(true)
  }

  useEffect(() => {
    if (error && !loading && showErr) {
      toast.error(error, {
        position: "top-center",
        theme: "light",
      });
      setShowErr(false);
    }
  }, [error, showErr, loading]);

  useEffect(() => {
    if (loading === true) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [loading]);

  const navigate = useNavigate();
  useEffect(() => {
    if (toLogin && bool) {
      navigate("/login");
      setBool(false)
    }
  }, [toLogin, bool]);

  return (
    <>
      <Background />
      <form className='formContainer' onSubmit={RESETPWD}>
        <div className="loginBg">
          <img
            src={arrow}
            id="arrow"
            onClick={() => {
              navigate("/otp");
            }}
          />
          <p className="authHead" id="authHeadTwo">
            Reset Password
          </p>
          <p className="authEmail" id="resetInput">
            New Password
          </p>
          <img src={lockIcon} id="lockIcon" />
          {show1 ? (
            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow1} />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              id="LEye"
              onClick={handleShow1}
            />
          )}
          <input
            type={show1 ? "text" : "password"}
            className="authEmailInput"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <p className="invalidEmail" id="resetpwd1">
            Password must be 1 uppercase 1 lowercase 1 number 1 special digit
            character and 8 or more characters
          </p>
          <p className="authPwd">Confirm Password</p>
          <img src={lockIcon} id="lockIcon" />
          {show2 ? (
            <FontAwesomeIcon icon={faEye} id="LEye" onClick={handleShow2} />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              id="LEye"
              onClick={handleShow2}
            />
          )}
          <input
            type={show2 ? "text" : "password"}
            className="authPwdInput"
            placeholder="Password"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            required
          />
          <p className="fgtRstPwd" id="resetPass2">
            Password and confirm password should match
          </p>
          <button className="authFgtPwdBtn" type="submit">
            Continue
          </button>
        </div>
      </form>
      {loading === true ? (
        <Spinner animation="border" variant="light" id="loadSpinner" />
      ) : null}
      <ToastContainer />
    </>
  );
}

export default ResetPwd;
