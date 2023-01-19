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
  const { response2, error2, mark, googleAuth } = google;
  // const {  msg, success } = response2;
console.log(window.location.href.substring(34))
  useEffect(() => {
    dispatch(GoogleTwoAction(window.location.href.substring(34)))
  }, [])
  console.log(google)
 
  useEffect(() => {
    // console.log(success)
    if(mark){
      if (response2.success == true) {
        if (response2.msg === "loggedin"){
          const user={
            user_name:response2.user.user_name,
            name:response2.user.name,
            displaypic:response2.user.displaypic,
            _id:response2.user._id
  
          }
          console.log(user)
          dispatch(infoViaGoogle(user))
          alert(response2.msg)
          navigate("/home")
        }
        if (response2.msg === "signedup"){
          // console.log(msg)
          sessionStorage.setItem("Google_name", response2.user_name)
          dispatch(nameViaGoogle(response2.user.name, response2.user.user_name))
          navigate("/googlesign")
          // alert("Signed In Successfully")
        }
      }
      if(response2.success == false){
        navigate("/")
        alert("Unable to login, Please try again")
      }
    }
   
  }, [response2, mark])
  // useEffect(() => {
  //   if (error2 != "") {
  //     navigate("/")
  //     alert("Unable to login, Please try again")
  //   }
  // }, [error2])
  return (<>
    <div style={{ "color": "white" }}>
    </div>
    <Spinner animation="border" variant="light" id="loadSpinner" />
  </>
  )
}

export default Google