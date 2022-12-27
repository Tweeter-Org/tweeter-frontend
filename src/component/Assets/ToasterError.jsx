import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect } from 'react';
const ToasterError = (props) => {
    useEffect(()=>{
        if(props.error!==""){
            toast.error(`${props.error}`, {
                position: "top-center",
                theme: "light",
                });
        }
    },[props.error])
 return <ToastContainer />
}

export default ToasterError