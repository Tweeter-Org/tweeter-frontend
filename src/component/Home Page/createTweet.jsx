import React, { useState, useEffect } from "react";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import { useNavigate } from "react-router";
import "./homepage.css"
import Picker from "emoji-picker-react"
import { CreateReTweetAct, CreateTweetAct, FakeReTweetFeedAction, FakeTweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { useDispatch } from "react-redux";
import FormData from "form-data";
import { useSelector } from "react-redux";
import ToasterSuccess from "../Assets/ToasterSuccess";
import Loader from "../Assets/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from "../Assets/avatar.svg";

function CreateTweet(props) {
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage] = useState(null);
    const [tagline, setTagLine] = useState("")

    const dispatch = useDispatch();
    const fd = new FormData();
    function handleSendImage(e) {
        var imageoutput= document.getElementById("imageOutput");
        imageoutput.src = URL.createObjectURL(e.target.files[0])
        setSendImage(e.target.files[0])
    }
    const [sendVideo, setSendVideo] = useState(null);
    function handleSendVideo(e) {
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
    function setOPacity() { /*SET BACKGROUND OPACITY*/
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 1;
        }
    }
    function backToHome(e) {
        e.preventDefault();
        setText("")
        document.getElementById("CREATETWEET").style.display = "none"
        setOPacity()
    }
    const { response, error, tweetCreate, loading } = useSelector((t) => t.TweetCreateReducer)
    const auth = useSelector((s) => s.AuthReducer)
    const { user, toFgtPwd } = auth;
    const { name, user_name, displaypic } = user;
    const { tweetData, liked, Rname, Rimage, Rvideo, Rtext } = useSelector((s) => s.TweetFeedReducer)
    console.log(tweetData)
    console.log(Rimage, Rvideo)
    const RId = sessionStorage.getItem("retweetId")
    useEffect(() => {
        tweetData.filter((t) => {
            if (t._id == props.TWRId) {
                console.log(t)
            }
            return t._id == props.TWRId
        })
        // console.log(RId)
    }, [props.TWRId])
    const newTweetCreated = {
        "image": sendImage,
        "likes": "0",
        "text": text,
        "video": sendVideo,
        user: {
            "name": name,
            "user_name": user_name,
            displaypic: displaypic
        }
    }
    const newReTweetCreated = {
        "image": sendImage,
        "likes": "0",
        "text": text,
        "video": sendVideo,
        user: {
            "name": name,
            "user_name": user_name,
            displaypic: displaypic
        },
        retweet: {
            "image": Rimage,
            "video": Rvideo,
            "text": Rtext,
            "_id": RId,
        }
    }
    function handleCreateTweet(e) {
        e.preventDefault();
        fd.append("text", text)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        dispatch(CreateTweetAct(fd))
        console.log(newTweetCreated)
        dispatch(FakeTweetFeedAction(newTweetCreated))
        backToHome(e)
        if (response !== "") {
            toast.success(`${response}`, {
                position: "top-center",
                theme: "light",
            });
        }
        else if (error !== "") {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
            });
        }
    }
    console.log(RId)
    function handleCreateReTweet(e) {
        e.preventDefault();
        fd.append("text", text)
        fd.append("tweetId", RId)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        dispatch(CreateReTweetAct(fd))
        dispatch(FakeReTweetFeedAction(newReTweetCreated))
        console.log("rewteet")
        console.log(newReTweetCreated)
        backToHome(e)
        if (response !== "") {
            toast.success(`${response}`, {
                position: "top-center",
                theme: "light",
            });
        }
        else if (error !== "") {
            toast.error(`${error}`, {
                position: "top-center",
                theme: "light",
            });
        }
    }
    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])
    return <>
        <div className="createTweetDiv" id="CREATETWEET">
            <div className="CTBlock1">
                {(displaypic === null) ? (<span className="ctCircle"><img src={avatar} id="picincircle" /></span>) :
                    ((displaypic.startsWith("https:")) ? (<span className="ctCircle"><img src={displaypic} id="picincircle" /></span>) :
                        (<span className="ctCircle"><img src={`https://twitterbackend-production-93ac.up.railway.app/${displaypic}`} id="picincircle" /></span>))
                }
                <div className="CTDiv1">
                    <p className="ctName">{name}</p>
                    <p className="ctUserName">{user_name}</p>
                </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}
                enctype="multipart/form-data" >
                <p className="ctTagline">Share tweets with your followers</p>
                <div className="ctWriteTweet">
                    <input type="text" className="ctWriteTweetInput" value={text} onChange={(e) => { setText(e.target.value) }} />
                </div>
                <div className="CTRetweetDiv" id="CTRETWEETDIV">
                    <div className="CTRet1">
                        <img src={avatar} id="CTRetweetImage" />
                        <div className="CTRet2">
                            <p id="CTRetweetName" className="ctName">{Rname}</p>
                            {/* <p id="CTRetweetUsernname" className="ctUserName">{user_name}</p> */}
                        </div>
                    </div>
                    {Rimage != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${Rimage}`} className="CTRVideo" alt="image" />) : null}
                    {Rvideo != null ? <video controls className="CTRVideo">
                        <source src={`https://twitterbackend-production-93ac.up.railway.app/${Rvideo}`} type="video/mp4" />
                    </video> : null}
                    <p className="TWRText" >{Rtext}</p>
                </div>
                <div className="CTBlock2">
                    <div className="CTUPLIMG">
                        <label for="ctuploadImg"><img src={imageIcon} className="ctImage" /></label>
                        <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
                        <p className="ctImageText">Image</p>
                        <p><img id="imageOutput" width="200" /></p>
                    </div>
                    <div>
                        <label for="ctuploadVideo"><img src={videoIcon} className="ctVideo" /></label>
                        <input type="file" id="ctuploadVideo" accept="video/mp4, audio/mp4" onChange={handleSendVideo} hidden />
                        <p className="ctVideoText">Video</p>
                    </div>
                    <div>
                        <img src={smileIcon} className="ctSmile" onClick={() => { handleEmojis() }} />
                        {showEmoji ? (<div className="emojipicker"><Picker theme="dark" onEmojiClick={onemojiclick} /></div>) : null}
                        <p className="ctSmileText">Emojis</p>
                    </div>
                    <button className="ctCancelTweet" onClick={backToHome}>Cancel</button>
                    <button className="ctCreateTweet" onClick={handleCreateTweet} id="buttonTweet" >Tweet</button>
                    <button className="ctCreateTweet" id="buttonRetweet" onClick={handleCreateReTweet}>ReTweet</button>
                </div>
            </form>
        </div>
        {loading === true ? <Loader loading={loading} /> : null}
        <ToastContainer />
    </>
}
export default CreateTweet