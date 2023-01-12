import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleTwoAction, infoViaGoogle, nameViaGoogle } from '../react-redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';

const Google = () => {
  const [path, setPath] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setPath(window.location.href)
    setUrl(path.substring(34))
  }, [])

  const google = useSelector((g) => g.GoogleReducer)
  const { response2, error2, mark } = google;
  const { token, msg, success } = response2;
console.log(window.location.href.substring(34))
  useEffect(() => {
    dispatch(GoogleTwoAction(window.location.href.substring(34)))
  }, [])
  console.log(google)
 
  useEffect(() => {
    console.log(success)
    if (response2.success == true) {
      if (msg === "loggedin"){
        dispatch(infoViaGoogle(response2.user))
        alert("Logged In Successfully")
        navigate("/home")
      }
      if (msg === "signedup"){
        console.log(msg)
        dispatch(nameViaGoogle(response2.user_name))
        navigate("/googlesign")
        // alert("Signed In Successfully")
      }
    }
  }, [response2])
  useEffect(() => {
    if (error2 != "") {
      navigate("/")
      alert("Unable to login, Please try again")
    }
  }, [error2])
  return (<>
    <div style={{ "color": "white" }}>
    </div>
    <Spinner animation="border" variant="light" id="loadSpinner" />
  </>
  )
}

export default Google