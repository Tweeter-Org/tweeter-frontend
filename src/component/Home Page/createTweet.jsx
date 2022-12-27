import React, { useState } from "react";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import { useNavigate } from "react-router";
import EmojiPicker from 'emoji-picker-react';
import "./homepage.css"
import Picker from "emoji-picker-react"

function CreateTweet (){
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage]= useState([]);
    function handleSendImage(e){
        console.log(e.target.files);
        setSendImage(e.target.files[0])
    }
    console.log(sendImage)
    function handleEmojis(){
        setShowEmoji(!showEmoji)
    }
    function onemojiclick(emojiObject, event) {
        setText(prevText=>prevText + emojiObject.emoji)
        setShowEmoji(false)
    }
    const navigate= useNavigate();
    console.log(text)
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
        <img src={imageIcon} className="ctImage" />
        <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} />
        <p className="ctImageText">Image</p>
        </div>
       
        <img src={videoIcon} className="ctVideo" />
        {/* <input type="file" id="ctuploadVideo" accept="video/mp4, audio/mp4"/> */}
        <p className="ctVideoText">Video</p>
        <img src={smileIcon} className="ctSmile" onClick={()=>{handleEmojis()}} />
        {showEmoji?(<div className="emojipicker"><Picker theme="dark" onEmojiClick={onemojiclick} /></div>):null}
        <p className="ctSmileText">Emojis</p>
        <button className="ctCancelTweet" onClick={()=>{navigate("/home")}}>Cancel</button>
        <button className="ctCreateTweet">Tweet</button>
    </div>

    </>
}
 export default CreateTweet