import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActiveUserList, CreateChat, ViewChatsAction } from "../../react-redux/actions/Message";
import { Messages } from "../../react-redux/actions/SearchApi";
import greenmessage from "../Assets/greenmsg.svg"
import avatar from "../Assets/avatar.svg"
import { NotifyChatSeen } from "../../react-redux/actions/Notifications";

function ChatUser(props) {
    const { user } = useSelector((a) => a.AuthReducer)
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [info, setInfo] = useState([])
    const chatList = props.sidechat
    const newMsgNotify = props.newMsgNotify
    const { unseenChats } = useSelector((n) => n.NotificationReducer)
    const [latestmsg, setLatestmsg] = useState("")
    const [id, setId] = useState("")
    const { userid } = useParams();
    const finalArray = []

    useEffect(() => {
       
        if (unseenChats.length > 0) {
            unseenChats.map((unseen) => {
               
                setId(unseen.userId)
                if (unseen.userId != userid) {
                   
                    // document.getElementsByClassName("notifyCircle2")[props.indexx].style.backgroundColor="pink"
                }
                // setLatestmsg(unseen.text)
                // if(unseen.userId == props.sidechat._id){
                //     setLatestmsg(unseen.chat.latestmsg)
                // }
            })
        }
    }, [unseenChats])

    useEffect(() => {
        props.sidechat.users.map((chat) => {
            setLatestmsg(props.sidechat.latestmsg.substring(props.sidechat.latestmsg.indexOf(":") + 1))
            if (chat._id !== user._id) {
                setInfo(chat)
            }
        })
    }, [user, chatList])

    useEffect(() => {
        props.sidechat.users.map((u) => {
            if (u._id == userid) {
                document.getElementsByClassName("chatUser")[props.indexx].style.backgroundColor = "rgba(255,255,255,0.1)"
                var ChatToColor = document.getElementsByClassName("chatUser")
                for (var i = 0; i < ChatToColor.length; i++) {
                    if (i != props.indexx) {
                        document.getElementsByClassName("chatUser")[i].style.background = "none"
                    }
                }
                setInfo(u)
                return u
            }
        })
    }, [userid])
 
    function handleUserChat(usernum) {
        dispatch(ActiveUserList());
        dispatch(Messages(greenmessage, "Messages", 3))
        navigate(`/chats/${usernum}`)
        dispatch(CreateChat(usernum))
        dispatch(NotifyChatSeen())
    }
    return <>
        <div className="chatUser" id="ChatUser1" >
            {(info.displaypic === null) ? (<img src={avatar} id="msgPicincircle" />) :
                (<img src={info.displaypic} id="msgPicincircle" />)
            }
            <div className="ChatUser2">
                <p className="msgName">{info.name}</p>
                <p className="msgUsername" onClick={() => {
                    handleUserChat(info._id)
                }}>{info.user_name}</p>
                {/* {newMsgNotify?(
                !newMsgNotify.is_read ? (<p className="msgNotify">New Chat:{latestmsg}</p>):null
            ):null} */}

                <p className="msgNotify">New msg:{latestmsg}</p>
            </div>
            {/* <span className="notifyCircle2" /> */}
        </div>
    </>
}

export default ChatUser
