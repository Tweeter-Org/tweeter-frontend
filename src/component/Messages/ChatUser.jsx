import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActiveUserList, CreateChat, ViewChatsAction } from "../../react-redux/actions/Message";
import { Messages } from "../../react-redux/actions/SearchApi";
import greenmessage from "../Assets/greenmsg.svg"
import avatar from "../Assets/avatar.svg"

function ChatUser(props) {
    const {user} = useSelector((a)=>a.AuthReducer)
    // const viewChatIdd = props.viewChatid;
    // // console.log(viewChatIdd)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[info, setInfo] = useState([])
    const chatList = props.sidechat
    // console.log(props.sidechat)

    useEffect(()=>{
      props.sidechat.users.map((chat)=>{
        // console.log(chat)
        if(chat._id != user._id){
            // setChats([...chats, chatUser])
            // console.log(chat)
            // console.log(chats)
            setInfo(chat)
        }

      })
    },[user, chatList])
    // console.log(chats)
    const { userid } = useParams();
    // // console.log(user)
    // // console.log(props.user)
    // const [info, setInfo] = useState({})
    // useEffect(()=>{
    //     props.user.map((u)=>{
    //         if(u.user_name!= user.user_name)
    //         {
    //             // console.log(u);
    //             setInfo(u)
    //             return u
    //         }
          
    //     })
    // },[props.user, userid])

    useEffect(()=>{
        props.sidechat.users.map((u)=>{
            if(u._id == userid)
            {
                document.getElementsByClassName("chatUser")[props.indexx].style.backgroundColor="rgba(255,255,255,0.1)"
                var ChatToColor =document.getElementsByClassName("chatUser")
                for(var i=0;i<ChatToColor.length; i++ ){
                    if(i!=props.indexx){
                        document.getElementsByClassName("chatUser")[i].style.background="none"
                    }   
                }
                setInfo(u)
                return u
            }
        })
    },[userid])
    // console.log(props.sidechat)
    function handleUserChat (usernum){
        dispatch(ActiveUserList());
        dispatch(Messages(greenmessage, "Messages", 3)) 
        navigate(`/chats/${usernum}`)
        dispatch(CreateChat(usernum))
        // dispatch(ViewChatsAction(viewChatIdd))
    }
    // console.log(props.msg)
    return <>
       <div className="chatUser" id="ChatUser1" >
       {(info.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    (<img src={info.displaypic} id="msgPicincircle"/>) 
                }
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
 