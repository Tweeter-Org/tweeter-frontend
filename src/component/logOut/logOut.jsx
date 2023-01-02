import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../Assets/logout.svg"
import "./logout.css"

function LogOut() {
    const naavigate = useNavigate()
    function handleLogOut() {
        sessionStorage.clear();
        naavigate("/");
        document.getElementsByClassName("poopupbg1")[0].style.opacity = 1;
        document.getElementsByClassName("poopupbg2")[0].style.opacity = 1;
        document.getElementsByClassName("poopupbg3")[0].style.opacity = 1;
        document.getElementsByClassName("poopupbg4")[0].style.opacity = 1;
        document.getElementsByClassName("logoutDiv")[0].style.display="none";

    }
    function handleCancelLog() {
        document.getElementsByClassName("poopupbg1")[0].style.opacity = 1;
        document.getElementsByClassName("poopupbg2")[0].style.opacity = 1;
        document.getElementsByClassName("poopupbg3")[0].style.opacity = 1;
        document.getElementsByClassName("poopupbg4")[0].style.opacity = 1;
        document.getElementsByClassName("logoutDiv")[0].style.display="none";
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