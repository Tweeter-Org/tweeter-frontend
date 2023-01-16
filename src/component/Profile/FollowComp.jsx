import React from "react";
import avatar from "../Assets/avatar.svg"


function FollowComp (props){
    return <>
        <div className="followCompDiv POPUPBG">
        {/* {(props.displaypic === null) ? ( <span className="displaySearchPic followPic"><img src={avatar}  id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? ( <span className="displaySearchPic followPic"><img src={props.displaypic} id="picincircle"/></span>) :
                        ( <span className="displaySearchPic followPic">
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="picincircle" /></span>))
                } */}
        {/* <span className="displaySearchPic followPic"><img src={avatar} id="picincircle"/></span> */}
        <p className="followName">{props.name}</p>
        <p className="followUsername">@{props.username}</p>
        {/* <p className="followUsername">{props.username}</p> */}
        </div>
    </>
}

export default FollowComp;