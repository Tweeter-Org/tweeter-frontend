import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../Assets/logout.svg"
import "./logout.css"
import { useDispatch } from "react-redux";
import { setLogout } from "../../react-redux/actions/authAction";
import FocusTrap from "focus-trap-react";

function LogOut({ onClose }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleLogOut() {
        await localStorage.clear();
        await dispatch(setLogout());

        onClose();

        navigate("/login");
    }

    return (
        <FocusTrap active>
            <div class="background">
                <div className="logoutDiv">
                    <div className="lOut1">
                        <p className="logoutText1">Log Out?</p>
                        <p className="logoutText2">Are you sure you want to log out?</p>
                        <button className="logoutbtn1" onClick={handleLogOut}>Yes</button>
                        <button className="logoutbtn2" onClick={onClose}>No</button>
                    </div>
                    <div className="lOut2">
                        <img src={logout} className="logoutImage" alt="" />
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
}

export default LogOut;
