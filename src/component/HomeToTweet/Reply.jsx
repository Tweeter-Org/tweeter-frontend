import React from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.svg";

function Reply(props) {
    const navigate = useNavigate();
    return <>
        <div className="ReplyDiv">
            <div className="Reply1">
                {(props.displaypic === null) ? (<img src={avatar} id="RepAvatar" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} />) :
                        (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} />))
                }
                <p id="RepName">{props.username}</p>
            </div>
            <p id="RepReply">Replying to<span id="RepAtName" onClick={()=>{console.log(`/profile/${props.reply}`)
                navigate(`/profile/${props.reply}`)}}>@{props.reply}</span></p>
            {props.image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.image}`} id="RepImage" alt="image" />) : null}
            {props.video != null ? <video controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${props.video}`} id="RepImage" type="video/mp4" />
            </video> : null}
            <p className="RepText">{props.text}</p>
            <p className="RepShowMore">...Show more</p>
        </div>
    </>
}
export default Reply;