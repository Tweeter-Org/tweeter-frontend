import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActiveUserList, CreateChat } from "../../react-redux/actions/Message";
import avatar from "../Assets/avatar.svg"

function ChatUser(props) {
    const {user} = useSelector((a)=>a.AuthReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(user)
    // console.log(props.user)
    const [info, setInfo] = useState({})
    useEffect(()=>{
        props.user.map((u)=>{
            if(u.user_name!= user.user_name)
            {
                console.log(u);
                setInfo(u)
                return u
            }
          
        })
    },[props.user])
    function handleUserChat (usernum){
        dispatch(ActiveUserList());
        navigate(`/chats/${usernum}`)
        dispatch(CreateChat(usernum))
    }
    // console.log(props.msg)
    return <>
       <div className="msgUser" id="ChatUser1" >
       {/* {(info.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((info.displaypic.startsWith("https:")) ? (<img src={info.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${info.displaypic}`}  id="msgPicincircle" />))
                } */}
        <div className="ChatUser2">
        <p className="msgName">{info.name}</p>
        <p className="msgUsername" onClick={()=>{
               handleUserChat(info._id)
            }}>{info.user_name}</p>
        {/* <p className="msgUsername">{props.msg}</p> */}
        </div>
       </div>
        </>
}

 export default ChatUser
 