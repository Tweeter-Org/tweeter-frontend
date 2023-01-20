import React, { Children } from "react";

import {Route, useAsyncValue, useNavigate} from "react-router-dom";
import { redirect } from "react-router-dom";

const PrivateRoute=({children , ...rest})=>{
    const navigate = useNavigate()
    const isUser = sessionStorage.getItem("access token")?true:false;

    return (<Route {...rest} render={()=>isUser?(children):(navigate("/"))} />)
}

export default PrivateRoute