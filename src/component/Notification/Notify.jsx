import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReadNotifyAction } from "../../react-redux/actions/Notifications";
import avatar from "../Assets/avatar.svg"

function Notify(props) {

    const mention = props.type;
    const notifId = props.notifId;
    const tweetId = props.tweetID;
    const isRead = props.isRead;
    const index = props.indexx;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = useSelector((n) => n.NotificationReducer)
    const { notifyread } = notify;
    function handleToTweet(tweetId) {
        navigate(`/notiftweet/${tweetId}`)
    }
    function handleNotify(notifId) {
        document.getElementsByClassName("notifyCard")[index].style.backgroundColor = "rgb(26, 28, 30)"
        document.getElementsByClassName("notifyCircle")[index].style.display="none"
        dispatch(ReadNotifyAction(notifId))
    }
    useEffect(() => {
        if (isRead) {
            document.getElementsByClassName("notifyCard")[index].style.backgroundColor = "rgb(26, 28, 30)"
            document.getElementsByClassName("notifyCircle")[index].style.display="none"
        }
        else {
            document.getElementsByClassName("notifyCard")[index].style.backgroundColor = "rgba(255, 255, 255, 0.1)"
            document.getElementsByClassName("notifyCircle")[index].style.display="block"
        }
    }, [isRead])

    return <>
        <div className="notifyCard" onClick={() => {
            handleNotify(notifId)
        }}>
            <hr id="notifyLine" />
            <div className="notify1">
                <div className="notifyInfo">
                    <img src={avatar} className="notifyPic" />
                    <div className="notify2">
                        <p className="notifyName">{props.name}</p>
                        <p className="notifyUsername">{props.username}
                        </p>
                    </div>
                </div>
                {mention=="like"? <p className="notifyMsg">{props.name} liked a <b onClick={() => {
                    handleToTweet(tweetId)
                }} className="notifTweet">Tweet</b> posted by you</p>:null}
                {mention == "mention" ? <p className="notifyMsg">Mentioned in <b onClick={() => {
                    handleToTweet(tweetId)
                }} className="notifTweet">#Tweet</b></p> : null}
                {/* <p className="notifyMsg">There is no new cj:nullbcjhdbjlastestfyy bgguiyh mesjhbj,hvbvhhhh,nhghhjftcsage</p> */}
            </div>
<span className="notifyCircle" />
        </div>


    </>
}

export default Notify