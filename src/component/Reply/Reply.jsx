import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.svg";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReplyToTweet, ViewRepliesToReply } from "../../react-redux/actions/Replies";
import Reply2 from "./Reply2";
import TweetLikeAction, { RetweetDetails } from "../../react-redux/actions/Tweets";
import greenLike from "../Assets/greenLike.svg"
import bookmark from "../Assets/bookmarks.svg";
import greenBookmarks from "../Assets/greenBookmarks.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks";

function Reply(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const id= props.indexx;
    const { responseT, errorT, replyR, loading } = useSelector((r) => r.ReplyReducer)
    console.log(replyR)
    const [replyArr, setReplyArr] = useState([])
    const [replyArr2, setReplyArr2] = useState([])

    useEffect(()=>{
        dispatch(ViewRepliesToReply(props.num))
        setReplyArr2(replyR)
    },[props.num])
    function handleReplytoReply(id){
        console.log("replyyyy")
        console.log(id)
        console.log(props.replyingto)
        dispatch(ViewRepliesToReply(id))
        setReplyArr(replyR)
        if(replyR.length>0)
        document.getElementsByClassName("RepShowMore")[props.indexx].style.display="none";
    }
    console.log(props.replyingto)
    console.log(replyArr2)

    function handleReplyLike(replyid) {
        dispatch(TweetLikeAction(replyid))
        var imagepath = document.getElementsByClassName("replyLike")[id].style.color;
        if (imagepath === "white") {
            document.getElementsByClassName("replyLike")[id].style.color = "green"
            document.getElementsByClassName("RlikeIcon")[id].src = greenLike
            // setTweetCount(tweetCount => tweetCount + 1)
        }
        else {
            document.getElementsByClassName("RlikeIcon")[id].src = like
            document.getElementsByClassName("replyLike")[id].style.color = "white"
            // setTweetCount(tweetCount => tweetCount - 1)
        }
    }
    const { responseBM, markBM } = useSelector((b) => b.BookmarkReducer)
    function handleTweetBookmark(tweetid) {
        document.getElementsByClassName("RbookmarkIcon")[id].src = greenBookmarks
        dispatch(DoBookmarkAction(tweetid))
        if (markBM) {
            if (responseBM === "Saved") {
                document.getElementsByClassName("RbookmarkIcon")[id].src = bookmark
            }
            if (responseBM === "Unsaved") {
                document.getElementsByClassName("RbookmarkIcon")[id].src = greenBookmarks
            }
        }
    }
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.4;
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
    }

    return <>
        <div className="ReplyDiv">
            <div className="Reply1">
                {(props.displaypic === null) ? (<img src={avatar} id="RepAvatar" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} />) :
                        (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} />))
                }
                <p id="RepName">{props.username}</p>
                <img src={bookmark} className="RbookmarkIcon" onClick={() => { handleTweetBookmark(props.num) }} />
            </div>
            <p id="RepReply">Replying to {props.replyingto.length>0?(props.replyingto.map((name)=>{
                return <span id="RepAtName" onClick={()=>{console.log(`/profile/${name}`)
                navigate(`/profile/${name}`)}}>@{name}</span>
            })):null}</p>
            {props.image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.image}`} id="RepImage" alt="image" />) : null}
            {props.video != null ? <video controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${props.video}`} id="RepImage" type="video/mp4" />
            </video> : null}
            <p className="RepText">{props.text}</p>
            <div className="secondTweetBlock" id="ReplyIconBlock">
                <div className="iconBlock">
                    <img src={like} className="RlikeIcon"  onClick={()=>{handleReplyLike(props.num)}}/>
                    <p className="replyLike" id="RTLike">Like</p>
                </div>
                <div className="iconBlock">
                {/* <img src={comment} id="ReplyComm" /> */}
                    <img src={comment} id="ReplyComm" onClick={()=>{handleTweetReply(props.num, props.username, props.image, props.video, props.text)}} />
                    <p className="tweetComm" id="RTLike">Comment</p>
                </div>
                <div className="iconBlock"> 
                <img src={retweet} className="retweetIcon"  id="ReplyRet" />
                    {/* <img src={retweet} className="retweetIcon" onClick={()=>handleRetweet(props.tweetId, props.username, image, video, props.text)} /> */}
                    <p className="tweetRetweet" id="RTLike">Retweet</p>
                </div>
                {/* <div className="iconBlock">
                    <img src={share} id="ReplyShare" />
                    <p className="tweetShare" id="RTLike">Share</p>
                </div> */}
            </div>
            <p className="RepShowMore" onClick={()=>{handleReplytoReply(props.num)}}>...Show more</p>
            {replyArr.length>0? (replyArr.map((rep)=>{
                return <Reply2 text={rep.text} image={rep.image} video={rep.video} username={rep.user.user_name}
                 displaypic={rep.user.displaypic} num={rep.id} replyingto={rep.replyingto} />
            })):null}
            {/* {replyArr2.length>0? <p className="RepShowMore" onClick={()=>{handleReplytoReply(props.num)}}>...Show more</p>:null} */}
           
        </div>
    </>
}
export default Reply;