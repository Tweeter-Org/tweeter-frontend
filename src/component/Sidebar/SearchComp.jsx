import React from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import ProfileAction from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg"

function SearchComp (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <>
        <div className="searchcomp poopupbg4">
        <span className="displaySearchPic"><img src={avatar} id="picincircle"/></span>
            <p className="searchName">{props.name}</p>
            <p className="searchUsername" onClick={()=>{localStorage.setItem("usernameInApi",props.username);navigate("/otherprofile")}}>{props.username}</p>
        </div>
    </>
}

export default SearchComp