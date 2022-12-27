import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect } from 'react';
const ToasterSuccess = (props) => {
    useEffect(()=>{
        if(props.response!==""){
            toast.success(`${props.response}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[props.response])
 return <ToastContainer />
}

export default ToasterSuccess