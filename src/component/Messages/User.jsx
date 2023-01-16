import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { CreateChat } from "../../react-redux/actions/Message";
import ProfileAction, { ProfileApi } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg"

function MsgUser (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleUserChat (usernum){
       
        navigate(`/chats/${usernum}`)
        dispatch(CreateChat(usernum))
    }
    return <>
        <div className="msgUser POPUPBG">
        {(props.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="msgPicincircle" />))
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