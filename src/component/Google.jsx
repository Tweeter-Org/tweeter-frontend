import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleTwoAction } from '../react-redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';

const Google = () => {
  const [path, setPath] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(path)
  console.log(window.location.href)
  console.log(window.location.href.substring(34))
  useEffect(() => {
    setPath(window.location.href)
    setUrl(path.substring(34))
  }, [])

  console.log(path.substring(34))
  console.log(url)

  const google = useSelector((g) => g.GoogleReducer)
  const { response2, error2, mark } = google;
  const { token, msg, success } = response2;

  useEffect(() => {
    dispatch(GoogleTwoAction(window.location.href.substring(34)))
  }, [])
  console.log(google)
  useEffect(() => {
    if (error2 != "") {
      navigate("/")
      alert("Unable to login, Please try again")
    }
  }, [error2])
  useEffect(() => {
    if (success === "true") {
      if (msg === "loggedin")
        alert("Logged In Successfully")
      if (msg === "signedin")
        alert("Signed In Successfully")
      navigate("/home")
    }
  }, [response2])
  return (<>
    <div style={{ "color": "white" }}>
    </div>
    <Spinner animation="border" variant="light" id="loadSpinner" />
  </>
  )
}

export default Google