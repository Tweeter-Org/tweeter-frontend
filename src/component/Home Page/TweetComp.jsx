import React, { useEffect } from "react";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import avatar from "../Assets/avatar.svg";
import bookmark from "../Assets/bookmarks.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetLikeAction, { RetweetDetails, TweetListWithTag } from "../../react-redux/actions/Tweets.jsx";
import greenLike from "../Assets/greenLike.svg"
import greenComment from "../Assets/greenComment.svg"
import greenRetweet from "../Assets/greenRetweet.svg"
import greenShare from "../Assets/greenSend.svg"
import greenBookmarks from "../Assets/greenBookmarks.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks.jsx";
import deleteIcon from "../Assets/delete.svg"
import { TweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { type } from "@testing-library/user-event/dist/type";
import CreateTweet from "./createTweet";
import { Navigate, useNavigate } from "react-router-dom";
import ShareTweet from "./ShareTweet";
import ReactHashtag from "react-hashtag";
import { unstable_createStaticHandler } from "@remix-run/router";

function Tweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const bookmarkShow = props.bookmarked
    const retweets = props.retweet;
    const dispatch = useDispatch();
    const [tweetCount, setTweetCount] = useState(props.likeCount)
    const [replyCount, setReplyCount] = useState(props.replyCount)
    const [replyingto, setReplyingto] = useState([])
    const { tweetData } = useSelector((s) => s.TweetFeedReducer)
    useEffect(() => {
    if (localStorage.getItem('idx')==props.number) {
        const index = localStorage.getItem('idx');
        setReplyCount(replyCount+1); 
        localStorage.removeItem('idx')
    }
}, [tweetData]);

    useEffect(() => {
        if (props.replies != null){
            setReplyingto(props.replies)
        }
        else{
            setReplyingto([])
        }    
    }, [props.replies])
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
        }
    }

    const { responseBM, markBM } = useSelector((b) => b.BookmarkReducer)

    function handleTweetBookmark(e, tweetid) {
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
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.4;
        }
    }

    function handleRetweet(tweetid, name, image, video, text) {
        dispatch(RetweetDetails(tweetid, name, video, text, image))
        sessionStorage.setItem("retweetId", tweetid)
        setOPacity()
        var retweetPath = document.getElementsByClassName("tweetRetweet")[id].style.color;
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CTweetText").style.display = "block";
        document.getElementById("CTRETWEETDIV").style.display = "flex";
        document.getElementById("buttonTweet").style.display = "none";
        document.getElementById("buttonReply").style.display = "none";
        document.getElementById("buttonReply2").style.display = "none";
        document.getElementById("buttonRetweet").style.display = "block";
        document.getElementById("CTReplyDiv").style.display = "none"
        if (retweetPath === "white") {
            document.getElementsByClassName("tweetRetweet")[id].style.color = "green"
            document.getElementsByClassName("retweetIcon")[id].src = greenRetweet
        }
        else {
            document.getElementsByClassName("retweetIcon")[id].src = retweet
            document.getElementsByClassName("tweetRetweet")[id].style.color = "white"
        }
    }

    function handleTweetReply(tweetid, name, image, video, text) {
        // setReplyCount(replyCount=> replyCount+1)
        localStorage.setItem('idx',props.number)
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
        document.getElementById("buttonReply2").style.display = "none";
    }

    function handleTweetShare(tweetid) {
        sessionStorage.setItem("shareTweetId", tweetid)
        document.getElementById("SHAREBLOCK").style.display = "flex"
        // setOPacity();
    }
    function showProfilePopup() {
        document.getElementsByClassName("tweetPopcomp")[id].style.display = "block"
    }

    function hideProfilePopup() {
        document.getElementsByClassName("tweetPopcomp")[id].style.display = "none"
    }
    const navigate = useNavigate();
    function handleToTweet(tweetId) {
        navigate(`/totweet/${tweetId}`)
    }

    /* HASHTAGS */
    const { loading, tagTweets, getTag } = useSelector((ta) => ta.TagTweetFeedReducer)
    function showTagTweet(e, tag) {
        e.stopPropagation();
        dispatch(TweetListWithTag(tag.slice(1)))
        navigate("/tagtweet")
        if (getTag) {
            navigate("/tagtweet")
        }
    }

    function showMentionedUser(name){
        navigate(`/profile/${name.slice(1)}`)
    }

    const [specialText, setSpecialText] = useState(props.text)
   
    useEffect(() => {
       
        var y = document.getElementsByClassName("tweetText")
        for (var i = 0; i < y.length; i++) {
            y[i].innerHTML = y[i].innerHTML.replace(/(^|\s)([#][A-Za-z\d-]+)/, "$1<span class='hashtagg'>$2</span>")
            y[i].innerHTML = y[i].innerHTML.replace(/(^|\s)([@][A-Za-z\d-]+)/, "<span class='mention' >$2</span>")
        }
        var x = document.getElementsByClassName("hashtagg")
        for (let j = 0; j < x.length; j++) {
            let hashtag = x[j].innerHTML
            x[j].onclick = function (e) {
                showTagTweet(e, hashtag)
            }
        }
       
        var z = document.getElementsByClassName("mention")
        for (let j = 0; j < z.length; j++) {
            let mention= z[j].innerHTML
            let count=j;
            z[j].onclick = function () {
               showMentionedUser( mention)
            }
        }
    }, [])

    return <>
        {retweets == null ? (<div className="tweetComp POPUPBG" >
            <div className="firstTweetBlock" onClick={() => { handleToTweet(props.tweetId) }} >
                {(props.displaypic === null) ? (<img src={avatar} id="picincircle" />) :
                    (<img src={props.displaypic} id="picincircle" />)}
                <div className="USERNAME">
                    <p className="username">{props.name}</p>
                    <p className="tweetUsername2" onMouseOver={showProfilePopup} onMouseOut={hideProfilePopup} >@{props.username}</p>
                </div>
                <img src={bookmark} className="bookmarkIcon" id="BMICON" onClick={(e) => { handleTweetBookmark(e, props.tweetId) }} />
            </div>
            {replyingto.length > 0 ? (<p id="prTwReplying1">Replying to {replyingto.length > 0 ? (replyingto.map((name) => {
                return <span id="prTwReplying2" onClick={() => {
                    navigate(`/profile/${name}`)
                }}>@{name}</span>
            })) : null}</p>) : null}
            <div className="tweetImageBG">
            {(image != null && image.startsWith("blob:")) ? (
                <img src={image} alt="image" className="tweetImage" />) : (
                image != null ? (<img src={image} alt="image" className="tweetImage" />) : null)}
            </div>
          

            {(video != null && video.startsWith("blob:")) ? (
                <video className="tweetvideo" controls>
                    <source src={video} type="video/mp4" />
                </video>) : (
                video != null ? (<video className="tweetvideo" controls>
                    <source src={video} type="video/mp4" />
                </video>) : null)}
            {/* {video != null ? <video className="tweetvideo" controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
            </video> : null} */}
            <p className="tweetText">{props.text}</p>
            <div className="secondTweetBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                    <p className="tweetLike">{tweetCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={comment} id="commentIcon" onClick={() => { handleTweetReply(props.tweetId, props.username, image, video, props.text) }} />
                    <p className="tweetComm">{replyCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={retweet} className="retweetIcon" onClick={() => handleRetweet(props.tweetId, props.username, image, video, props.text)} />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon" onClick={() => { handleTweetShare(props.tweetId) }} />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
        </div>) : (<div className="tweetComp POPUPBG" id="tweetRet" >
            <div className="firstTweetBlock" onClick={() => { handleToTweet(props.tweetId) }} >
                {(props.displaypic === null) ? (<img src={avatar} id="picincircle" />) :
                    (<img src={props.displaypic} id="picincircle" />)

                }
                <div className="USERNAME">
                    <p className="username">{props.name}</p>
                    <p className="tweetUsername2" onMouseOver={showProfilePopup} onMouseOut={hideProfilePopup} >@{props.username}</p>
                </div>
                <img src={bookmark} className="bookmarkIcon" onClick={(e) => { handleTweetBookmark(e, props.tweetId) }} />
            </div>
            {replyingto.length > 0 ? (<p id="prTwReplying1">Replying to {replyingto.length > 0 ? (replyingto.map((name) => {
                return <span id="prTwReplying2" onClick={() => {
                    
                    navigate(`/profile/${name}`)
                }}>@{name}</span>
            })) : null}</p>) : null}
            {(image != null) ? (<img src={image} alt="image" className="tweetImage" />) : null}
            {(video != null) ? <video className="tweetvideo" controls>
                <source src={video} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            <div className="tweetWithRetwwet">
                <div className="TWRBlock1">
                    {(retweets.user.displaypic === null) ? (<img src={avatar} className="TWRpic" />) :
                        ((retweets.user.displaypic.startsWith("https:")) ? (<img src={retweets.user.displaypic} className="TWRpic" />) :
                            (<img src={retweets.user.displaypic} id="picincircle" />))
                    }
                    <p className="username">{retweets.user.user_name}</p>
                </div>
                {(retweets.image != null) ? (<img src={retweets.image} className="TWRVideo" alt="image" />) : null}
                {(retweets.video != null) ? <video controls className="TWRVideo">
                    <source src={retweets.video} type="video/mp4" />
                </video> : null}

                <p className="TWRText" ><ReactHashtag renderHashtag={val => <span onClick={() => showTagTweet(val)}>{val}</span>} onHashTagClick={val => console.log(val)}>{retweets.text}</ReactHashtag></p>
            </div>
            <div className="secondTweetBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                    <p className="tweetLike">{tweetCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={comment} id="commentIcon" onClick={() => { handleTweetReply(props.tweetId, props.username, image, video, props.text) }} />
                    <p className="tweetComm">{replyCount}</p>
                </div>
                <div className="iconBlock">
                    <img src={retweet} className="retweetIcon" onClick={() => handleRetweet(props.tweetId, props.username, image, video, props.text)} />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon" onClick={() => { handleTweetShare(props.tweetId) }} />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
        </div>)}
        <CreateTweet />
        <ShareTweet />
    </>
}

export default Tweet;