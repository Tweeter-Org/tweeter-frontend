import React, { useState } from "react";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import { useNavigate } from "react-router";
import EmojiPicker from 'emoji-picker-react';
import "./homepage.css"
import Picker from "emoji-picker-react"
import { CreateTweetAct } from "../../react-redux/actions/createTweetAction";
import { useDispatch } from "react-redux";

function CreateTweet (){
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage]= useState([]);
    const dispatch= useDispatch();
    function handleSendImage(e){
        console.log(e.target.files);
        setSendImage(e.target.files[0])
    }
    const [sendVideo, setSendVideo]= useState([]);
    function handleSendVideo(e){
        console.log(e.target.files);
        setSendVideo(e.target.files[0])
    }

    function handleEmojis(){
        setShowEmoji(!showEmoji)
    }
    function onemojiclick(emojiObject, event) {
        setText(prevText=>prevText + emojiObject.emoji)
        setShowEmoji(false)
    }
    const navigate= useNavigate();
    console.log(text)
    console.log(sendImage, sendVideo)
    const formdata=0;

   
    function backToHome(){
        navigate("/home");
        document.getElementById("CREATETWEET").style.display="none"
        document.getElementsByClassName("poopupbg1")[0].style.opacity=1;
        document.getElementsByClassName("poopupbg2")[0].style.opacity=1;
        document.getElementsByClassName("poopupbg3")[0].style.opacity=1;
    }
    return <>
    <div className="createTweetDiv" id="CREATETWEET">
        <span className="ctCircle" />
        <p className="ctName">Peter Beans</p>
        <p className="ctUserName">@peter beans</p>
        <p className="ctTagline">Share tweet with your followers</p>
        <div className="ctWriteTweet">
        <input type="text" className="ctWriteTweetInput" value={text} onChange={(e)=>{setText(e.target.value)}} />
        </div>
        <div className="CTUPLIMG">
        
        <label for="ctuploadImg"><img src={imageIcon} className="ctImage" /></label>
        <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
        <p className="ctImageText">Image</p>
        </div>
       
        <label for="ctuploadVideo"><img src={videoIcon} className="ctVideo" /></label>
        <input type="file" id="ctuploadVideo" accept="video/mp4, audio/mp4" onChange={handleSendVideo} hidden/>
        <p className="ctVideoText">Video</p>
        <img src={smileIcon} className="ctSmile" onClick={()=>{handleEmojis()}} />
        {showEmoji?(<div className="emojipicker"><Picker theme="dark" onEmojiClick={onemojiclick} /></div>):null}
        <p className="ctSmileText">Emojis</p>
        <button className="ctCancelTweet" onClick={()=>{backToHome()}}>Cancel</button>
        <button className="ctCreateTweet" onClick={()=>{dispatch(CreateTweetAct(formdata))}}>Tweet</button>
    </div>

    </>
}
 export default CreateTweet