import React from "react";
import avatar from "../Assets/avatar.svg"

function ChatUser(props) {
    return <>
       <div className="msgUser" id="ChatUser1" >
       {(props.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="msgPicincircle" />))
                }
        <div className="ChatUser2">
        <p className="msgName">{props.name}</p>
        <p className="msgUsername">{props.username}</p>
        </div>
       </div>
        </>
}

 export default ChatUser
 