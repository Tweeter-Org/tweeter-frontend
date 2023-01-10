import React, { useEffect } from "react";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import avatar from "../Assets/avatar.svg";
import bookmark from "../Assets/bookmarks.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetLikeAction, { RetweetDetails } from "../../react-redux/actions/Tweets.jsx";
import greenLike from "../Assets/greenLike.svg"
import greenComment from "../Assets/greenComment.svg"
import greenRetweet from "../Assets/greenRetweet.svg"
import greenShare from "../Assets/greenSend.svg"
import greenBookmarks from "../Assets/greenBookmarks.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import TweetPopup from "../Home Page/tweetPopup";
import CreateTweet from "../Home Page/createTweet";
import { ViewTweetsReply } from "../../react-redux/actions/Replies";
import Reply from "./Reply";
import Loader from "../Assets/Loader";

function ToTweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const bookmarkShow = props.bookmarked
    const retweets = props.retweet;
    const dispatch = useDispatch();
    const [tweetCount, setTweetCount] = useState(props.likeCount)
    console.log(props.retweet)
    // useEffect(() => {
    //     setTweetCount(props.likeCount)
    //     if (props.LIKES) {
    //         document.getElementsByClassName("tweetLike")[id].style.color = "green"
    //         document.getElementsByClassName("likeIcon")[id].src = greenLike
    //     }
    //     else {
    //         document.getElementsByClassName("likeIcon")[id].src = like
    //         document.getElementsByClassName("tweetLike")[id].style.color = "white"
    //     }
    // }, [props.LIKES])
    // useEffect(() => {
    //     if (bookmarkShow) {
    //         document.getElementsByClassName("bookmarkIcon")[id].src = greenBookmarks
    //     }
    //     else {
    //         document.getElementsByClassName("bookmarkIcon")[id].src = bookmark
    //     }
    // }, [bookmarkShow])

    //to like a tweet
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
        }
    }

    //to mark bookmarkes
    const { responseBM, markBM } = useSelector((b) => b.BookmarkReducer)
    function handleTweetBookmark(tweetid) {
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
    //background blur
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.4;
        }
    }

    //retweet a tweet
    function handleRetweet(tweetid, name, image, video, text) {
        dispatch(RetweetDetails(tweetid, name, video, text, image))
        sessionStorage.setItem("retweetId", tweetid)
        setOPacity()
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CTweetText").style.display = "block";
        document.getElementById("CTRETWEETDIV").style.display = "flex";
        document.getElementById("buttonTweet").style.display = "none";
        document.getElementById("buttonReply").style.display = "none";
        document.getElementById("buttonRetweet").style.display = "block";
        document.getElementById("CTReplyDiv").style.display = "none"
        var retweetPath = document.getElementsByClassName("tweetRetweet")[id].style.color;
        if (retweetPath === "white") {
            document.getElementsByClassName("tweetRetweet")[id].style.color = "green"
            document.getElementsByClassName("retweetIcon")[id].src = greenRetweet
        }
        else {
            document.getElementsByClassName("retweetIcon")[id].src = retweet
            document.getElementsByClassName("tweetRetweet")[id].style.color = "white"
        }
    }

    //reply to a tweet
    function handleTweetReply(tweetid, name, image, video, text) {
        dispatch(RetweetDetails(tweetid, name, video, text, image))
        sessionStorage.setItem("retweetId", tweetid)
        setOPacity()
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CTReplyDiv").style.display = "block"
        document.getElementById("CTRETWEETDIV").style.display = "none";
        document.getElementById("CTweetText").style.display = "none";
        document.getElementById("buttonTweet").style.display = "none";
        document.getElementById("buttonRetweet").style.display = "none";
        document.getElementById("buttonReply").style.display = "block";
    }

    //show profile popup
    function showProfilePopup() {
        document.getElementsByClassName("tweetPopcomp")[id].style.display = "block"
    }

    //hide profile popup
    function hideProfilePopup() {
        // document.getElementsByClassName("tweetPopcomp")[id].style.display = "none"
    }
    const navigate = useNavigate();
    function handleToTweet(tweetId) {
        navigate(`/totweet/${tweetId}`)
        console.log(`/totweet/${tweetId}`)
    }
    const x = props.text.indexOf('#');
    const y = props.text.indexOf(' ')
    const HashArray = [];
    var index1 = -1, index2 = -1, str
    for (var i = 0; i < props.text.length; i++) {
        console.log("loop")
        if (props.text[i] == '#') {
            index1 = i;
            console.log(index1)
            for (var j = index1 + 1; j < props.text.length + 1; j++) {
                if (props.text[j] == ' ') {
                    index2 = j;
                    console.log("loop2")
                    console.log(index2)
                    break;
                }
                console.log("loop3")
                if (j === props.text.length - 1) {
                    console.log(j)
                }

            }
            str = props.text.substring(index1, index2)
            HashArray.push(str)
            // HashArray[hash=>...hash, str]
            // HashArray[((hash)=>{...hash, str})]
            console.log(str)
        }
    }
    console.log(HashArray)

    //view reply to tweet 
    const { responseT, errorT, replyT, loading, replies } = useSelector((r) => r.ReplyReducer)
    console.log(responseT, errorT, replyT)
    const [replyArr, setReplyArr] = useState([])
    useEffect(() => {
        setReplyArr(replies)
    }, [replyT])
    console.log(replyArr)

    //for loader
    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    return <>
        {retweets == null ? (<div className="tweetComp POPUPBG" id="RepTweet">
            <div className="firstTweetBlock">
                {(props.displaypic === null) ? (<span className="displaypie"><img src={avatar} id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? (<span className="displaypie"><img src={props.displaypic} id="picincircle" /></span>) :
                        (<span className="displaypie"><img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="picincircle" /></span>))
                }
                <p className="username" onMouseOver={showProfilePopup} onMouseOut={hideProfilePopup} >{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" onClick={() => { handleTweetBookmark(props.tweetId) }} />
                <TweetPopup name={props.username} num={id} />
            </div>
            {image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) : null}
            {video != null ? <video className="tweetvideo" controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            <div className="secondTweetBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                    <p className="tweetLike">{tweetCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={comment} id="commentIcon" onClick={() => { handleTweetReply(props.tweetId, props.username, image, video, props.text) }} />
                    <p className="tweetComm">Comment</p>
                </div>
                <div className="iconBlock">
                    <img src={retweet} className="retweetIcon" onClick={() => handleRetweet(props.tweetId, props.username, image, video, props.text)} />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon" />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
            <p id="RepAlter" onClick={() => { handleTweetReply(props.tweetId, props.username, image, video, props.text) }}><span>
                <img src={greenComment} id="RepComIcon" />
            </span>Add a comment</p>
            {replyArr.length > 0 ? (replyArr.map((reply, index) => {
                return <Reply text={reply.text} image={reply.image} video={reply.video} username={reply.user.user_name} 
                displaypic={reply.user.displaypic} reply={props.username} num={reply._id} indexx={index} replyingto={reply.replyingto} />
            })) : null}
        </div>) : (<div className="tweetComp POPUPBG" id="tweetRet RepTweet"  >
            <div className="firstTweetBlock" >
                {(props.displaypic === null) ? (<span className="displaypie"><img src={avatar} id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? (<span className="displaypie"><img src={props.displaypic} id="picincircle" /></span>) :
                        (<span className="displaypie"><img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="picincircle" /></span>))
                }
                <p className="username" onMouseOver={showProfilePopup} onMouseOut={hideProfilePopup} >{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" onClick={() => { handleTweetBookmark(props.tweetId) }} />
                <TweetPopup name={props.username} num={id} />
            </div>
            {(image != null) ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) : null}
            {(video != null) ? <video className="tweetvideo" controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            <div className="tweetWithRetwwet">
                <div className="TWRBlock1">
                    {(retweets.user.displaypic === null) ? (<img src={avatar} className="TWRpic" />) :
                        ((retweets.user.displaypic.startsWith("https:")) ? (<img src={retweets.user.displaypic} className="TWRpic" />) :
                            (<img src={`https://twitterbackend-production-93ac.up.railway.app/${retweets.user.displaypic}`} id="picincircle" />))
                    }
                    <p className="username">{retweets.user.user_name}</p>
                </div>
                {(retweets.image != null) ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${retweets.image}`} className="TWRVideo" alt="image" />) : null}
                {(retweets.video != null) ? <video controls className="TWRVideo">
                    <source src={`https://twitterbackend-production-93ac.up.railway.app/${retweets.video}`} type="video/mp4" />
                </video> : null}
                <p className="TWRText" >{retweets.text}</p>
            </div>
            <div className="secondTweetBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                    <p className="tweetLike">{tweetCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={comment} id="commentIcon" onClick={() => { handleTweetReply(props.tweetId, props.username, image, video, props.text) }} />
                    <p className="tweetComm">Comment</p>
                </div>
                <div className="iconBlock">
                    <img src={retweet} className="retweetIcon" onClick={() => handleRetweet(props.tweetId, props.username, image, video, props.text)} />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon" />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
            <p id="RepAlter" onClick={() => { handleTweetReply(props.tweetId, props.username, image, video, props.text) }}><span>
                <img src={greenComment} id="RepComIcon" />
            </span>Add a comment</p>
            {replyArr.length > 0 ? (replyArr.map((reply, index) => {
                return <Reply text={reply.text} image={reply.image} video={reply.video} username={reply.user.user_name}
                 displaypic={reply.user.displaypic} reply={props.username} indexx={index} num={reply._id} replyingto={reply.replyingto} />
            })) :null}
        </div>)}
        <CreateTweet />
        {(loading === true) ? <Loader loading={loading} /> : null}
    </>
}

export default ToTweet;