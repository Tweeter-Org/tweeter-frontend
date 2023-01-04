import React from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import avatar from "../Assets/avatar.svg"

function TweetPopup(props) {
    const navigate = useNavigate();
    return <>
        <div className="tweetPopcomp" onMouseOver={()=>document.getElementsByClassName("tweetPopcomp")[props.num].style.display="block"} onMouseOut={()=>document.getElementsByClassName("tweetPopcomp")[props.num].style.display="none"}>
            <span className="displayTweetPic"><img src={avatar} id="picincircle" /></span>
            <p className="tweetUsername" onClick={() => { navigate(`/profile?name=${props.name}`);document.getElementsByClassName("tweetUsername").style.color="#47c87a" }}>{props.name}</p>
        </div>
    </>
}

export default TweetPopup