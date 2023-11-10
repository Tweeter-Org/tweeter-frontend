import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { ActiveUserList, CreateChat } from "../../react-redux/actions/Message";
import { Messages } from "../../react-redux/actions/SearchApi";
import avatar from "../Assets/avatar.svg"
import greenmessage from "../Assets/greenmsg.svg"
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";
import { ShareTweet } from "../../react-redux/actions/Tweets";

const ENDPOINT = "https://tweeter.devalan.tech/";
var socket, currentChattingWith;
function ShareTweetUser(props) {

    const {user} = useSelector((a)=>a.AuthReducer)

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user);
        socket.on("connection", () => {
        })
    }, [])

    const viewChatIdd = props.viewChatid;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { userid } = useParams();
    const [info, setInfo] = useState({})
    useEffect(()=>{
        props.user.map((u)=>{
            if(u.user_name!= user.user_name)
            {
                setInfo(u)
                return u
            }
          
        })
    },[props.user])

    const tweetId = sessionStorage.getItem("shareTweetId")

    const { createChatList } = useSelector((m) => m.MsgSearchReducer)
    const shared = useSelector((m) => m.ShareTweetRed)
    const [shareBool, setShareBool] = useState(false)

    function handleShareUser() {

        const data = {
            "tweetId": sessionStorage.getItem("shareTweetId"),
            "chatId": viewChatIdd
        }
        dispatch(ShareTweet(data, socket))
        if(shared.sharedSuccess)
        setShareBool(true)
        document.getElementById("SHAREBLOCK").style.display="none"
    }

    return <>
        <div className="shareUser POPUPBG">
            {(info.displaypic === null) ? (<img src={avatar} id="sharePicincircle" />) :
               (<img src={info.displaypic} id="sharePicincircle" />) }
            <div className="shareUser2">
                <p className="shareName">{info.name}</p>
                <p className="shareUsername" onClick={() => {
                    handleShareUser()
                }}>{info.user_name}</p>
            </div>
        </div>
        <ToastContainer />
    </>
  
}

export default ShareTweetUser