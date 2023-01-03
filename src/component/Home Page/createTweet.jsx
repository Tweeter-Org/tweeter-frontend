import React, { useState , useEffect} from "react";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import { useNavigate } from "react-router";
import EmojiPicker from 'emoji-picker-react';
import "./homepage.css"
import Picker from "emoji-picker-react"
import { CreateTweetAct, FakeTweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { useDispatch } from "react-redux";
import FormData from "form-data";
import { useSelector } from "react-redux";
import ToasterSuccess from "../Assets/ToasterSuccess";
import Loader from "../Assets/Loader";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from "../Assets/avatar.svg";

function CreateTweet() {
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage] = useState([null]);
    const dispatch = useDispatch();
    const fd = new FormData();
    function handleSendImage(e) {
        console.log(e.target.files);
        setSendImage(e.target.files[0])
    }
    const [sendVideo, setSendVideo] = useState([null]);
    function handleSendVideo(e) {
        console.log(e.target.files);
        setSendVideo(e.target.files[0])
    }

    function handleEmojis() {
        setShowEmoji(!showEmoji)
    }

    function onemojiclick(emojiObject, event) {
        setText(prevText => prevText + emojiObject.emoji)
        setShowEmoji(false)
    }

    const navigate = useNavigate();  
    console.log(fd)

    function setOPacity (){ /*SET BACKGROUND OPACITY*/
        var items= document.getElementsByClassName("POPUPBG")
        for(var i=0;i<items.length;i++){
            document.getElementsByClassName("POPUPBG")[i].style.opacity=1;
        }
    }
    function backToHome(e) {
        e.preventDefault();
        setText("")
        document.getElementById("CREATETWEET").style.display = "none"
        setOPacity()
    }
    const {response,error,tweetCreate, loading} = useSelector((t)=>t.TweetCreateReducer)
    console.log(tweetCreate)

    const auth = useSelector((s)=>s.AuthReducer)
const {user, toFgtPwd} = auth;
const {name, user_name, displaypic} = user;
const {tweetData, liked} = useSelector((s)=>s.TweetFeedReducer)
console.log(tweetData)
const newTweetCreated = {
    "image":sendImage,
    "likes":"0",
    "text":text,
    "video":sendVideo,
    user:{
        "name":name,
        "user_name":user_name,
        displaypic:displaypic
    }
}
console.log(newTweetCreated)
    function handleCreateTweet (e){
        e.preventDefault();
        fd.append("text", text)
        if(sendImage!=""){
            fd.append("file",sendImage)
        }
        else if(sendVideo!=""){
            fd.append("file",sendVideo)
        }
        else{
            fd.append("file",null)
        }
        dispatch(CreateTweetAct(fd))
        console.log(newTweetCreated)
        dispatch(FakeTweetFeedAction(newTweetCreated))
        backToHome(e)
            if(response!==""){
                toast.success(`${response}`, {
                    position: "top-center",
                    theme: "light",
                    });
            }
            else if(error!==""){
                toast.error(`${error}`, {
                    position: "top-center",
                    theme: "light",
                    });
            }
       
    }
    useEffect(()=>{
        if(loading===true){
            document.body.style.opacity = 0.5;
        }
        else{
            document.body.style.opacity = 1;
        }
    },[loading])
 
    return <>
        <div className="createTweetDiv" id="CREATETWEET">
            {(displaypic === null) ? (<span className="ctCircle"><img src={avatar} id="picincircle" /></span>) :
                    ((displaypic.startsWith("https:")) ? (<span className="ctCircle"><img src={displaypic} id="picincircle" /></span>) :
                        (<span className="ctCircle"><img src={`https://twitterbackend-production-93ac.up.railway.app/${displaypic}`} id="picincircle" /></span>))
                }
            <p className="ctName">{name}</p>
            <p className="ctUserName">{user_name}</p>
            <form onSubmit={(e)=>e.preventDefault()}
            enctype="multipart/form-data" >
            <p className="ctTagline">Share tweet with your followers</p>
            <div className="ctWriteTweet">
                <input type="text" className="ctWriteTweetInput" value={text} onChange={(e) => { setText(e.target.value) }} />
            </div>
            <div className="CTUPLIMG">

                <label for="ctuploadImg"><img src={imageIcon} className="ctImage" /></label>
                <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
                <p className="ctImageText">Image</p>
            </div>
            <label for="ctuploadVideo"><img src={videoIcon} className="ctVideo" /></label>
            <input type="file" id="ctuploadVideo" accept="video/mp4, audio/mp4" onChange={handleSendVideo} hidden />
            <p className="ctVideoText">Video</p>
            <img src={smileIcon} className="ctSmile" onClick={() => { handleEmojis() }} />
            {showEmoji ? (<div className="emojipicker"><Picker theme="dark" onEmojiClick={onemojiclick} /></div>) : null}
            <p className="ctSmileText">Emojis</p>
            <button className="ctCancelTweet" onClick={backToHome}>Cancel</button>
            <button className="ctCreateTweet"  onClick={handleCreateTweet} >Tweet</button>
            </form>
        </div>
{loading===true?<Loader loading={loading} />:null}
<ToastContainer />
    </>
}
export default CreateTweet