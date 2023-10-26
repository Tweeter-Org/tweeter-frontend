import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewNotifyAction } from "../../react-redux/actions/Notifications";
import Loader from "../Assets/Loader";
import noNotification from "../Assets/noNotification.svg";
import Sidebar from "../Sidebar/SideBar";
import "./Notification.css";
import Notify from "./Notify";

function Notifications() {
    const dispatch = useDispatch();
    const notify = useSelector((n) => n.NotificationReducer)
    const { notifyBool, viewNotifs, loading } = notify
    const [notifyList, setNotifylist] = useState([])

    useEffect(() => {
        dispatch(ViewNotifyAction())
    }, [])
    useEffect(() => {
        if (notifyBool) {
            setNotifylist(viewNotifs)
        }
    }, [notifyBool])
    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])
    return <>
        <Sidebar />
        <div className="NOTIFY">
            <div className="notifyFlexbox">
                {notifyList.length > 0 ? notifyList.map((notif, index) => {
                    return <Notify name={notif.user.name} indexx={index} username={notif.user.user_name} isRead={notif.is_read} type={notif.type} notifId={notif._id} tweetID={notif.tweetId} />
                }) :
                    <div className="alterBM alterNotify"><img src={noNotification} className="alterBMImage" />
                        <p className="alterBMText1 alterNotText">No New Notifications</p>
                      </div>}
            </div>
        </div>
        {(loading === true) ? <Loader loading={loading} /> : null}
    </>
}
export default Notifications