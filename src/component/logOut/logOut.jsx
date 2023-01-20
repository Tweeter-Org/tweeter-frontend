import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../Assets/logout.svg"
import "./logout.css"

function LogOut() {
    const naavigate = useNavigate()
    function handleLogOut() {
        sessionStorage.clear();
        naavigate("/login");
        document.getElementsByClassName("logoutDiv")[0].style.display="none";

    }
    function setOPacity (){
        var items= document.getElementsByClassName("POPUPBG")
        for(var i=0;i<items.length;i++){
            document.getElementsByClassName("POPUPBG")[i].style.opacity=1;
        }
    }

    function handleCancelLog() {
        document.getElementsByClassName("logoutDiv")[0].style.display="none";
        setOPacity()
    }

    return <>
        <div className="logoutDiv">
            <div className="lOut1">
                <p className="logoutText1">Log Out?</p>
                <p className="logoutText2">Are you sure you want to log out?</p>
                <button className="logoutbtn1" onClick={handleLogOut}>Done</button>
                <button className="logoutbtn2" onClick={handleCancelLog}>Cancel</button>
            </div>
            <div className="lOut2">
                <img src={logout} className="logoutImage" />
            </div>
        </div>

    </>
}

export default LogOut;