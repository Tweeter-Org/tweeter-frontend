import React, { useEffect } from "react";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import avatar from "../Assets/avatar.svg";
import bookmark from "../Assets/bookmarks.svg";
// import delete from "../Assets/delete.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetLikeAction, { RetweetDetails } from "../../react-redux/actions/Tweets.jsx";
import greenLike from "../Assets/greenLike.svg"
import greenComment from "../Assets/greenComment.svg"
import greenRetweet from "../Assets/greenRetweet.svg"
import greenShare from "../Assets/greenSend.svg"
import greenBookmarks from "../Assets/greenBookmarks.svg"
import greencross from "../Assets/greencross.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks.jsx";
import deleteIcon from "../Assets/delete.svg"
import { TweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { type } from "@testing-library/user-event/dist/type";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DltTweetPopup from "./DeleteTweetPopup";
import { useNavigate } from "react-router-dom";
import ShareTweet from "../Home Page/ShareTweet"

function ProfileTweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const bookmarkShow = props.bookmarked
    const retweets = props.retweet;
    const dispatch = useDispatch();
    const [tweetCount, setTweetCount] = useState(props.likeCount)
    const { response, isLiked, isDelete } = useSelector((l) => l.TweetLikeReducer)
    const [replyingto, setReplyingto] = useState([])
    useEffect(()=>{
        if(props.replies!=null)
        setReplyingto(props.replies)
        else
        setReplyingto([])
    },[props.replies])
   
    // console.warn(props.replies)
    // console.warn(replyingto)

    useEffect(() => {
        setTweetCount(props.likeCount)
        if (props.LIKES) {
            document.getElementsByClassName("tweetLike")[id].style.color = "green"
            document.getElementsByClassName("likeIcon")[id].src = greenLike
        }
        else {
            document.getElementsByClassName("likeIcon")[id].src = like
            document.getElementsByClassName("tweetLike")[id].style.color = "white"
        }
    }, [props.LIKES])
    useEffect(() => {
        if (bookmarkShow) {
            document.getElementsByClassName("bookmarkIcon")[id].src = greenBookmarks
        }
        else {
            document.getElementsByClassName("bookmarkIcon")[id].src = bookmark
        }
    }, [bookmarkShow])
    function handleTweetLike(tweetid) {
        dispatch(TweetLikeAction(tweetid))
        var imagepath = document.getElementsByClassName("tweetLike")[id].style.color;
        if (imagepath === "white") {
            document.getElementsByClassName("tweetLike")[id].style.color = "green"
            document.getElementsByClassName("likeIcon")[id].src = greenLike
            setTweetCount(tweetCount => tweetCount + 1)
        }
        else {
            document.getElementsByClassName("likeIcon")[id].src = like
            document.getElementsByClassName("tweetLike")[id].style.color = "white"
            setTweetCount(tweetCount => tweetCount - 1)
            console.log(tweetCount)

        }
    }

    const { responseBM, markBM } = useSelector((b) => b.BookmarkReducer)
    function handleTweetBookmark(e,tweetid) {
        e.stopPropagation();
        document.getElementsByClassName("bookmarkIcon")[id].src = greenBookmarks
        dispatch(DoBookmarkAction(tweetid))
        if (markBM) {
            if (responseBM === "Saved") {
                document.getElementsByClassName("bookmarkIcon")[id].src = bookmark
            }
            if (responseBM === "Unsaved") {
                document.getElementsByClassName("bookmarkIcon")[id].src = greenBookmarks
            }
        }
    }
    const {deleteTweet, errorTweet, deleteSym} = useSelector((d)=>d.DeleteTweetsPReducer)
    const { profile, accessProfile, loading , editprofile,ifedit , profileTweet} = useSelector((p) => p.ProfileReducer)
    const {myprofile} = profile;
    const navigate = useNavigate();
    
    function setOPacity (){
        var items= document.getElementsByClassName("POPUPBG")
        for(var i=0;i<items.length;i++){
            document.getElementsByClassName("POPUPBG")[i].style.opacity=0.1;
        }
    }

    function handleTweetDelete(e,tweetid) {
        e.stopPropagation();
        sessionStorage.setItem("dlttweetId", tweetid)
        setOPacity()
        document.getElementsByClassName("deleteIcon")[id].src = greencross
        document.getElementById("DltPopUp").style.display="block"
        document.getElementById("DltPopUp").style.opacity=1;
       
    }

function handleRetweet (tweetid, name, image, video, text){
    dispatch(RetweetDetails(tweetid,name, video, text, image))
    sessionStorage.setItem("retweetId", tweetid)
    setOPacity()
    var retweetPath = document.getElementsByClassName("tweetRetweet")[id].style.color;
    document.getElementById("CREATETWEET").style.display = "block"
    document.getElementById("CTweetText").style.display="block";
    document.getElementById("CTRETWEETDIV").style.display="flex";
    document.getElementById("buttonTweet").style.display="none";
    document.getElementById("buttonReply").style.display="none";
    document.getElementById("buttonReply2").style.display = "none";
    document.getElementById("buttonRetweet").style.display="block";
    document.getElementById("CTReplyDiv").style.display="none"
    if (retweetPath === "white") {
        document.getElementsByClassName("tweetRetweet")[id].style.color = "green"
        document.getElementsByClassName("retweetIcon")[id].src = greenRetweet
    }
    else {
        document.getElementsByClassName("retweetIcon")[id].src = retweet
        document.getElementsByClassName("tweetRetweet")[id].style.color = "white"
    }
}

function handleTweetReply(tweetid, name, image, video, text){
    dispatch(RetweetDetails(tweetid,name, video, text, image))
    sessionStorage.setItem("retweetId", tweetid)
    setOPacity()
    document.getElementById("CREATETWEET").style.display = "block"
    document.getElementById("CTReplyDiv").style.display="block"
    document.getElementById("CTRETWEETDIV").style.display="none";
    document.getElementById("CTweetText").style.display="none";
    document.getElementById("buttonTweet").style.display="none";
    document.getElementById("buttonRetweet").style.display="none";
    document.getElementById("buttonReply").style.display="block";
    document.getElementById("buttonReply2").style.display = "none";
}

function handleToTweet (tweetId){
    navigate(`/totweet/${tweetId}`)
    console.log("From outer div")
}
function handleTweetShare (tweetid){
    sessionStorage.setItem("shareTweetId", tweetid)
    document.getElementById("SHAREBLOCK").style.display="flex"
    // setOPacity();
}

    return <>
    {retweets===null?(<div className="tweetComp POPUPBG" id="profileTweetComp">
            <div className="firstTweetBlock" onClick={()=>{handleToTweet(props.tweetId)}}>
                {(props.displaypic === null) ? (<img src={avatar} id="picincircle" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="picincircle" />) :
                        (<img src={props.displaypic} id="picincircle" />))
                }
                <div className="USERNAME">
                <p className="username">{props.name}</p>
                <p className="tweetUsername2">@{props.username}</p>
                </div>

                <img src={bookmark} className="bookmarkIcon" id="bmIcon" onClick={(e) => { handleTweetBookmark(e,props.tweetId) }} />
               {myprofile?<img src={deleteIcon} className="deleteIcon" id="delIcon" onClick={(e) => {handleTweetDelete(e,props.tweetId)}} />:null}
            </div>
            {replyingto.length>0?(<p id="prTwReplying1">Replying to {replyingto.length > 0 ? (replyingto.map((name) => {
                    return <span id="prTwReplying2" onClick={() => {
                        console.log(`/profile/${name}`)
                        navigate(`/profile/${name}`)
                    }}>@{name}</span>
                })) : null}</p>):null}
            
            {image != null ? (<img src={image} alt="image" className="tweetImage" id="ProfileImage"/>) : null}
            {video != null ? <video className="tweetvideo" id="ProfileVideo" controls>
                <source src={video} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            <div className="secondTweetBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                    <p className="tweetLike">{tweetCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={comment} id="commentIcon" onClick={()=>{handleTweetReply(props.tweetId, props.username, image, video, props.text)}} />
                    <p className="tweetComm">Comment</p>
                </div>
                <div className="iconBlock">
                    <img src={retweet} id="retweetIcon" className="profileRetweetIcon" onClick={()=>handleRetweet(props.tweetId, props.username, image, video, props.text)}/>
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon"  onClick={()=>{handleTweetShare(props.tweetId)}}/>
                    <p className="tweetShare">Share</p>
                </div>
            </div>
        </div>):(<div className="tweetComp POPUPBG" id="profileTweetComp">
            <div className="firstTweetBlock" onClick={()=>{handleToTweet(props.tweetId)}}>
                {(props.displaypic === null) ? (<img src={avatar} id="picincircle" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="picincircle" />) :
                        (<img src={props.displaypic} id="picincircle" />))
                }
                <div className="USERNAME">
                <p className="username">{props.name}</p>
                <p className="tweetUsername2">@{props.username}</p>
                </div>
                <img src={bookmark} className="bookmarkIcon" id="bmIcon" onClick={(e) => { handleTweetBookmark(e,props.tweetId) }} />
               {myprofile?<img src={deleteIcon} className="deleteIcon" id="delIcon" onClick={(e) => {handleTweetDelete(e,props.tweetId)}} />:null}
            </div>
            {replyingto.length>0?(<p id="RepReply">Replying to {replyingto.length > 0 ? (replyingto.map((name) => {
                    return <span id="RepAtName" onClick={() => {
                        console.log(`/profile/${name}`)
                        navigate(`/profile/${name}`)
                    }}>@{name}</span>
                })) : null}</p>):null}
            {image != null ? (<img src={image} alt="image" className="tweetImage" id="ProfileImage"/>) : null}
            {video != null ? <video className="tweetvideo" id="ProfileVideo" controls>
                <source src={video} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            <div className="tweetWithRetwwet" id="TWRProfile">
            <div className="TWRBlock1">
            {(retweets.user.displaypic === null) ? (<img src={avatar} className="TWRpic" />) :
                    ((retweets.user.displaypic.startsWith("https:")) ? (<img src={retweets.user.displaypic}  className="TWRpic"/>) :
                        (<img src={retweets.user.displaypic} id="picincircle" />))
                }
                <p className="username">{retweets.user.user_name}</p>
            </div>
        {(retweets.image != null) ? (<img src={retweets.image} className="TWRVideo" alt="image" />) : null}
            {(retweets.video != null) ? <video controls className="TWRVideo">
                <source src={retweets.video} type="video/mp4" />
            </video> : null}
            <p className="TWRText" >{retweets.text}</p>
        </div>
            <div className="secondTweetBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                    <p className="tweetLike">{tweetCount}</p>
                </div> 
                <div className="iconBlock">
                    <img src={comment} id="commentIcon" onClick={()=>{handleTweetReply(props.tweetId, props.username, image, video, props.text)}} />
                    <p className="tweetComm">Comment</p>
                </div>
                <div className="iconBlock">
                    <img src={retweet} id="retweetIcon" className="profileRetweetIcon" onClick={()=>handleRetweet(props.tweetId, props.username, image, video, props.text)} />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon"  onClick={()=>{handleTweetShare(props.tweetId)}} />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
        </div>)}
        <ToastContainer />
        <ShareTweet />
    </>
}

export default ProfileTweet;