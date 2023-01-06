import React from "react";
import avatar from "../Assets/avatar.svg"


function FollowComp (props){
    return <>
        <div className="followCompDiv POPUPBG">
        <span className="displaySearchPic followPic"><img src={avatar} id="picincircle"/></span>
        <p className="followName">{props.name}</p>
        <p className="followUsername">{props.username}</p>
        {/* <p className="followUsername">{props.username}</p> */}
        </div>
    </>
}

export default FollowComp;