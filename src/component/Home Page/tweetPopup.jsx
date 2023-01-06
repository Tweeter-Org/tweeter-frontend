import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { ProfileApi } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg"

function TweetPopup(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pro = useSelector((p) => p.ProfileNameReducer)
    function toProfile(name) {
        document.getElementsByClassName("tweetUsername")[props.num].style.color = "#47c87a"
        console.log(name)
        dispatch(ProfileApi(name))
        navigate(`/profile?name=${name}`)
        console.log(`/profile?name=${name}`)
    }
    return <>
        <div className="tweetPopcomp" onMouseOver={() => document.getElementsByClassName("tweetPopcomp")[props.num].style.display = "block"} onMouseOut={() => document.getElementsByClassName("tweetPopcomp")[props.num].style.display = "none"}>
            <span className="displayTweetPic"><img src={avatar} id="picincircle" /></span>
            <p className="tweetUsername" onClick={() => { toProfile(props.name) }}>{props.name}</p>
        </div>
    </>
}

export default TweetPopup