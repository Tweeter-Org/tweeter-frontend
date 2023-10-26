import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.svg";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import { useDispatch, useSelector } from "react-redux";
import { NameInReplyAction, ViewRepliesToReply } from "../../react-redux/actions/Replies";
import TweetLikeAction, { RetweetDetails, TweetListWithTag } from "../../react-redux/actions/Tweets";
import greenLike from "../Assets/greenLike.svg"
import bookmark from "../Assets/bookmarks.svg";
import greenBookmarks from "../Assets/greenBookmarks.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks";

function Reply2(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const id = props.indexx;
  
    const { responseT, errorT, replyR, loading } = useSelector((r) => r.ReplyReducer)
  

    function handleReplyLike(replyid) {
     
        // dispatch(TweetLikeAction(replyid))
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
        document.getElementById("buttonReply").style.display = "none";
        document.getElementById("buttonReply2").style.display = "block";
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
        document.getElementById("buttonReply2").style.display = "none";
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
    function handleTweetShare (tweetid){
        sessionStorage.setItem("shareTweetId", tweetid)
        document.getElementById("SHAREBLOCK").style.display="flex"
        // setOPacity();
    }

         /* HASHTAGS */
         const { tagTweets, getTag } = useSelector((ta) => ta.TagTweetFeedReducer)
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
     
         useEffect(() => {
             var y = document.getElementsByClassName("RepText")
             for (var i = 0; i < y.length; i++) {
                 y[i].innerHTML = y[i].innerHTML.replace(/(^|\s)([#][a-z\d-]+)/, "$1<span class='hashtagg'>$2</span>")
                 y[i].innerHTML = y[i].innerHTML.replace(/(^|\s)([@][a-z\d-]+)/, "<span class='mention' >$2</span>")
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
        <div className="Reply2Block">
            <hr id="Reply2Line" />
            <div id="Reply2Div">
                <div className="Reply1">
                    {(props.displaypic === null) ? (<img src={avatar} id="RepAvatar2" />) :
                       
                            (<img src={props.displaypic} id="RepAvatar2" />)
                    }
                    <p id="RepName">{props.username}</p>
                    <img src={bookmark} className="RbookmarkIcon2" onClick={() => { handleTweetBookmark(props.num) }} />
                </div>
                <p id="RepReply">Replying to {props.replyingto.length > 0 ? (props.replyingto.map((name) => {
                    return <span id="RepAtName" onClick={() => {
                      
                        navigate(`/profile/${name}`)
                    }}>@{name}</span>
                })) : null}</p>
                {props.image != null ? (<img src={props.image} id="RepImage" alt="image" />) : null}
                {props.video != null ? <video controls>
                    <source src={props.video} id="RepImage" type="video/mp4" />
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
                    <div className="iconBlock">
                    <img src={share} id="ReplyShare" onClick={()=>{handleTweetShare(props.num)}} />
                    <p className="tweetShare" id="RTLike">Share</p>
                </div>
                </div>
            </div>
        </div>

    </>
}
export default Reply2;