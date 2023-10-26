import React from "react";
import { useNavigate } from "react-router";

function AuthHome(){
    const navigate =useNavigate();
    return <>
        <button onClick={()=>{
            navigate("/login")
        }} >Login</button>
    </>
}

export default AuthHome