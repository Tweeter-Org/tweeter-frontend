import React from "react";
import avatar from "../Assets/avatar.svg"
import { useNavigate } from "react-router-dom";

function FollowComp (props){
    const navigate = useNavigate();
    return <>
        <div className="followCompDiv POPUPBG">
        {(props.displaypic === null) ? ( <span className="displaySearchPic followPic"><img src={avatar}  id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? ( <span className="displaySearchPic followPic"><img src={props.displaypic} id="picincircle"/></span>) :
                        ( <span className="displaySearchPic followPic">
                        <img src={props.displaypic}  id="picincircle" /></span>))
                }
        {/* <span className="displaySearchPic followPic"><img src={avatar} id="picincircle"/></span> */}
        <p className="followName">{props.name}</p>
        <p className="followUsername" onClick={()=>{
              navigate(`/profile/${props.username}`)
        }}>@{props.username}</p>
        {/* <p className="followUsername">{props.username}</p> */}
        </div>
    </>
}

export default FollowComp;