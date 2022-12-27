import React from 'react'
import ErrorImage from "../ErrorImage.svg"
import "./error.css"
const Error = () => {
  return <>
  <img src={ErrorImage} id="errorimage"/>
    <p className='error'>Error 404</p>
    <p className='errorHead'>The page you're looking for isn't here</p>
  </>
}

export default Error