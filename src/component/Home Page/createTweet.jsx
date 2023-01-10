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
import { FakeReplyTweetAction, ReplyToTweet } from "../../react-redux/actions/Replies";

function CreateTweet(props) {
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage] = useState(null);
    const dispatch = useDispatch();
    const fd = new FormData();
    function handleSendImage(e) {
        var imageoutput = document.getElementById("imageOutput");
        imageoutput.src = URL.createObjectURL(e.target.files[0])
        setSendImage(e.target.files[0])
        document.getElementById("imageOutput").style.display = "block"
    }
    const [sendVideo, setSendVideo] = useState(null);
    function handleSendVideo(e) {
        var videooutput = document.getElementById("videoOutput");
        videooutput.src = URL.createObjectURL(e.target.files[0])
        setSendVideo(e.target.files[0])
        document.getElementById("VIDEO").style.display = "block"
        document.getElementById("videoOutput").style.display = "block"
    }

    function handleEmojis() {
        setShowEmoji(!showEmoji)
    }

    function onemojiclick(emojiObject, event) {
        setText(prevText => prevText + emojiObject.emoji)
        setShowEmoji(false)
    }

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
        document.getElementById("imageOutput").style.display = "none"
        document.getElementById("videoOutput").style.display = "none"
        document.getElementById("VIDEO").style.display = "none"
        setOPacity()
    }
    const { response, error, tweetCreate, loading } = useSelector((t) => t.TweetCreateReducer)
    console.log(response)
    const auth = useSelector((s) => s.AuthReducer)
    const { user, toFgtPwd } = auth;
    const { name, user_name, displaypic } = user;
    const [DupTweetData, setDupTweetData] = useState([])
    const { tweetData, liked, Rname, Rimage, Rvideo, Rtext } = useSelector((s) => s.TweetFeedReducer)
    // const tweetData =[];
    console.log(tweetData)
    console.log(Rimage, Rvideo)
    const RId = sessionStorage.getItem("retweetId")
    useEffect(() => {
        setDupTweetData(tweetData)
        DupTweetData.filter((t) => {
            if (t._id == props.TWRId) {
                console.log(t)
            }
            return t._id == props.TWRId
        })
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

        backToHome(e)
        if (response !== "") {
            dispatch(FakeTweetFeedAction(newTweetCreated))
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

        console.log("rewteet")
        console.log(newReTweetCreated)
        backToHome(e)
        if (response !== "") {
            dispatch(FakeReTweetFeedAction(newReTweetCreated))
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
    const { responseT, errorT, nameInReply, showName } = useSelector((r) => r.ReplyReducer)
   
    console.log(responseT, errorT, nameInReply)
    console.log(nameInReply)
    console.log(showName)
    const atNames = sessionStorage.getItem("replyName");
    // useEffect(()=>{
    //     if(showName){
    //         nameInReply.filter((n)=>{
    //             if(n==atNames){
    //                 console.log(n)
    //             document.getElementById("CTReplyAtName1").style.display="none";}
    //             else
    //             document.getElementById("CTReplyAtName1").style.display="inline";
    //         })
    //     }
    //         else{
    //             document.getElementById("CTReplyAtName1").style.display="inline";
    //         }
    // },[nameInReply, showName])
    const replYtweet = {
        "image": sendImage,
        "likes": "0",
        "text": text,
        "video": sendVideo,
        user: {
            "user_name": user_name,
            "displaypic": displaypic
        },
        "replyingto": nameInReply
    }
    function handleTweetReply(e) {
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
        dispatch(ReplyToTweet(fd))
        console.log("home")
        dispatch(FakeReplyTweetAction(replYtweet))
        console.log("home")
        backToHome(e)
        console.log(replYtweet)
        if (responseT !== "") {
            toast.success(`${responseT}`, {
                position: "top-center",
                theme: "light",
            });
        }
        else if (errorT !== "") {
            toast.error(`${errorT}`, {
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
    const navigate = useNavigate();
    
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
                <div id="CTweetText">
                    <p className="ctTagline">Share tweets with your followers</p>
                    <div className="ctWriteTweet">
                        <input type="text" className="ctWriteTweetInput" value={text} onChange={(e) => { setText(e.target.value) }} />
                    </div>
                </div>
                <div className="CTRetweetDiv" id="CTRETWEETDIV">
                    <div className="CTRet1">
                        <img src={avatar} id="CTRetweetImage" />
                        <div className="CTRet2">
                            <p id="CTRetweetName" className="ctName">{Rname}</p>
                            {/* <p id="CTRetweetUsernname" className="ctUserName">{user_name}</p> */}
                        </div>
                    </div>
                    {Rimage != null ? (<p className="TWRImageText" >Tweets's Image -: &ensp;<a id="TWRImageLink" href={`https://twitterbackend-production-93ac.up.railway.app/${Rimage}`} target="_blank">{`https://twitterbackend-production-93ac.up.railway.app/${Rimage}`}</a></p>) : null}
                    {Rvideo != null ? (<p className="TWRImageText" >Tweets's Video -: &ensp;<a id="TWRImageLink" href={`https://twitterbackend-production-93ac.up.railway.app/${Rvideo}`} target="_blank">{`https://twitterbackend-production-93ac.up.railway.app/${Rvideo}`}</a></p>) : null}
                    {/* {Rimage != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${Rimage}`} className="CTRVideo" alt="image" />) : null}
                    {Rvideo != null ? <video controls className="CTRVideo">
                        <source src={`https://twitterbackend-production-93ac.up.railway.app/${Rvideo}`} type="video/mp4" />
                    </video> : null} */}
                    <p className="TWRText" >{Rtext}</p>
                </div>
                <div id="CTReplyDiv">
                    <p className="ctName">Replying to<span id="CTReplyAtName1"> @{atNames}</span>{
                        showName ? (
                            nameInReply.length > 0 ? (nameInReply.map((name) => {
                                return <span id="CTReplyAtName" onClick={() => {
                                    console.log(`/profile/${name}`)
                                    navigate(`/profile/${name}`)
                                }}>@{name}</span>
                            })) : null
                        ) : null
                    }
                    </p>
                    {/* <p className="ctName">Replying to <span id="CTReplyAtName">@{Rname}</span></p> */}
                    <div className="CTReplyTweet">
                        <input type="text" id="CTReplyInput" className="ctWriteTweetInput" value={text} onChange={(e) => { setText(e.target.value) }} />
                    </div>
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
                        <p><video id="VIDEO" width="200" controls>
                            <source id="videoOutput" width="200" type="video/mp4, audio/mp4" />
                        </video>
                        </p>
                    </div>
                    <div>
                        <img src={smileIcon} className="ctSmile" onClick={() => { handleEmojis() }} />
                        {showEmoji ? (<div className="emojipicker"><Picker theme="dark" onEmojiClick={onemojiclick} /></div>) : null}
                        <p className="ctSmileText">Emojis</p>
                    </div>
                    <button className="ctCancelTweet" onClick={backToHome}>Cancel</button>
                    <button className="ctCreateTweet" onClick={handleCreateTweet} id="buttonTweet" >Tweet</button>
                    <button className="ctCreateTweet" id="buttonRetweet" onClick={handleCreateReTweet}>ReTweet</button>
                    <button className="ctCreateTweet" id="buttonReply" onClick={handleTweetReply}>Reply</button>
                </div>
            </form>
        </div>
        {loading === true ? <Loader loading={loading} /> : null}
        <ToastContainer />
    </>
}
export default CreateTweet