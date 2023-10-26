import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { ActiveUserList, CreateChat, ViewChatList } from "../../react-redux/actions/Message";
import ProfileAction, { ProfileApi } from "../../react-redux/actions/Profile";
import { Messages } from "../../react-redux/actions/SearchApi";
import avatar from "../Assets/avatar.svg"
import greenmessage from "../Assets/greenmsg.svg"

function MsgUser (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleUserChat (usernum){
        dispatch(ActiveUserList());
        dispatch(Messages(greenmessage, "Messages", 3)) 
        navigate(`/chats/${usernum}`)
        dispatch(CreateChat(usernum))
        dispatch(ViewChatList())
    }
    return <>
        <div className="msgUser POPUPBG">
        {(props.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    (<img src={props.displaypic} id="msgPicincircle"/>) 
                }
                <div className="msgUser2">
                <p className="msgName">{props.name}</p>
            <p className="msgUsername" onClick={()=>{
               handleUserChat(props.userNum)
            }}>{props.username}</p>
                </div>
           
        </div>
    </>
}

export default MsgUser