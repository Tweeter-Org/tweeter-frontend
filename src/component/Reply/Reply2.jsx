import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.svg";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import { useDispatch, useSelector } from "react-redux";
import { NameInReplyAction, ViewRepliesToReply } from "../../react-redux/actions/Replies";
import TweetLikeAction, { RetweetDetails } from "../../react-redux/actions/Tweets";
import greenLike from "../Assets/greenLike.svg"
import bookmark from "../Assets/bookmarks.svg";
import greenBookmarks from "../Assets/greenBookmarks.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks";

function Reply2(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const id = props.indexx;
    console.log(id)
    const { responseT, errorT, replyR, loading } = useSelector((r) => r.ReplyReducer)
    console.log(replyR)

    function handleReplyLike(replyid) {
        console.log(replyid)
        // dispatch(TweetLikeAction(replyid))
        console.log("like")
        var imagepath = document.getElementsByClassName("replyLike2")[id].style.color;
        if (imagepath === "white") {
            document.getElementsByClassName("replyLike2")[id].style.color = "green"
            document.getElementsByClassName("RlikeIcon2")[id].src = greenLike
            // setTweetCount(tweetCount => tweetCount + 1)
        }
        else {
            document.getElementsByClassName("RlikeIcon2")[id].src = like
            document.getElementsByClassName("replyLike2")[id].style.color = "white"
            // setTweetCount(tweetCount => tweetCount - 1)
        }
    }
    const { responseBM, markBM } = useSelector((b) => b.BookmarkReducer)
    function handleTweetBookmark(tweetid) {
        document.getElementsByClassName("RbookmarkIcon2")[id].src = greenBookmarks
        dispatch(DoBookmarkAction(tweetid))
        if (markBM) {
            if (responseBM === "Saved") {
                document.getElementsByClassName("RbookmarkIcon2")[id].src = bookmark
            }
            if (responseBM === "Unsaved") {
                document.getElementsByClassName("RbookmarkIcon2")[id].src = greenBookmarks
            }
        }
    }
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.4;
        }
    }
    function handleTweetReply(tweetid, name, image, video, text) {
        dispatch(NameInReplyAction(props.replyingto))
        sessionStorage.setItem("replyName", name)
        // dispatch()
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
    function handleRetweet(tweetid, name, image, video, text) {
        dispatch(RetweetDetails(tweetid, name, video, text, image))
        sessionStorage.setItem("retweetId", tweetid)
        setOPacity()
        var retweetPath = document.getElementsByClassName("RtweetRetweet")[id].style.color;
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CTweetText").style.display = "block";
        document.getElementById("CTRETWEETDIV").style.display = "flex";
        document.getElementById("buttonTweet").style.display = "none";
        document.getElementById("buttonReply").style.display = "none";
        document.getElementById("buttonRetweet").style.display = "block";
        document.getElementById("CTReplyDiv").style.display = "none"
        if (retweetPath === "white") {
            document.getElementsByClassName("RtweetRetweet")[id].style.color = "green"
            // document.getElementsByClassName("RretweetIcon")[id].src = greenRetweet
        }
        else {
            document.getElementsByClassName("RretweetIcon")[id].src = retweet
            document.getElementsByClassName("RtweetRetweet")[id].style.color = "white"
        }
    }
    return <>
        <div className="Reply2Block">
            <hr id="Reply2Line" />
            <div id="Reply2Div">
                <div className="Reply1">
                    {(props.displaypic === null) ? (<img src={avatar} id="RepAvatar2" />) :
                        ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} />) :
                            (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} />))
                    }
                    <p id="RepName">{props.username}</p>
                    <img src={bookmark} className="RbookmarkIcon2" onClick={() => { handleTweetBookmark(props.num) }} />
                </div>
                <p id="RepReply">Replying to {props.replyingto.length > 0 ? (props.replyingto.map((name) => {
                    return <span id="RepAtName" onClick={() => {
                        console.log(`/profile/${name}`)
                        navigate(`/profile/${name}`)
                    }}>@{name}</span>
                })) : null}</p>
                {props.image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.image}`} id="RepImage" alt="image" />) : null}
                {props.video != null ? <video controls>
                    <source src={`https://twitterbackend-production-93ac.up.railway.app/${props.video}`} id="RepImage" type="video/mp4" />
                </video> : null}
                <p className="RepText">{props.text}</p>

                <div className="secondTweetBlock" id="ReplyIconBlock">
                    <div className="iconBlock">
                        <img src={like} className="RlikeIcon2" onClick={() => { handleReplyLike(props.num) }} />
                        <p className="replyLike2" id="RTLike">Like</p>
                    </div>
                    <div className="iconBlock">
                        <img src={comment} id="ReplyComm" onClick={() => { handleTweetReply(props.num, props.username, props.image, props.video, props.text) }} />
                        <p className="tweetComm" id="RTLike">Comment</p>
                    </div>
                    <div className="iconBlock">
                        <img src={retweet} className="RretweetIcon" onClick={() => handleRetweet(props.num, props.username, props.image, props.video, props.text)} />
                        <p className="RtweetRetweet" id="RTLike">Retweet</p>
                    </div>
                    {/* <div className="iconBlock">
                    <img src={share} id="ReplyShare" />
                    <p className="tweetShare" id="RTLike">Share</p>
                </div> */}
                </div>
            </div>
        </div>

    </>
}
export default Reply2;