import React from "react";
import Sidebar from "../Sidebar/SideBar";
import "./Notification.css";
import Notify from "./Notify";

function Notifications (){
    return <>
        <Sidebar />
        <div className="NOTIFY">
            <div className="notifyFlexbox">
                <Notify />
            </div>
        </div>
    </>
}
export default Notifications