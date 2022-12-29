import React, { useEffect } from "react";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import avatar from "../Assets/avatar.svg";
import bookmark from "../Assets/bookmarks.svg"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetLikeAction from "../../react-redux/actions/TweetLikeAction";
import greenLike from "../Assets/greenLike.svg"
import greenComment from "../Assets/greenComment.svg"
import greenRetweet from "../Assets/greenRetweet.svg"
import greenShare from "../Assets/greenSend.svg"
import greenBookmarks from "../Assets/greenBookmarks.svg"
import DoBookmarkAction from "../../react-redux/actions/bookmarkAction";

function Tweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const bookmarkShow = props.bookmarkb
    console.log(bookmarkShow)
    const dispatch = useDispatch();
    const { response, isLiked } = useSelector((l) => l.TweetLikeReducer)
    function handleTweetLike(tweetid) {
        dispatch(TweetLikeAction(tweetid))
        if (isLiked) {
            if (response === "Liked") {
                document.getElementsByClassName("likeIcon")[id].src = like
                document.getElementsByClassName("tweetLike")[id].style.color = "white"
            }
            if (response === "Unliked") {
                document.getElementsByClassName("tweetLike")[id].style.color = "green"
                document.getElementsByClassName("likeIcon")[id].src = greenLike
            }
        }
    }
const {responseBM, markBM} = useSelector((b)=>b.BookmarkReducer)
    function handleTweetBookmark (tweetid){
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

    useEffect(()=>{
        if(bookmarkShow==="true"){
            document.getElementsByClassName("bookmarkIcon")[id].src = greenBookmarks
        }
        else{
            document.getElementsByClassName("bookmarkIcon")[id].src = bookmark
        }
    },[bookmarkShow])
    return <>
            <div className="tweetComp">
            <div className="firstTweetBlock">
            {props.displaypic!=null?(<span className="displaypie"><img src={props.displaypic} id="picincircle"/></span>):
            (<span className="displaypie"><img src={avatar} id="picincircle"/></span>)}
            {/* <span className="displaypie"><img src={props.displaypic} /></span> */}
                <p className="username">{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" id="bmIcon" onClick={() => { handleTweetBookmark(props.tweetId) }}/>
            </div>
           
                               {image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) : null}
                {video != null ? <video className="tweetvideo" controls>
                    <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
                </video> : null}
                <p className="tweetText">{props.text}</p>
                <div className="secondTweetBlock">
                <div className="iconBlock">
                <img src={like} className="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
                <p className="tweetLike">Like</p>
                </div>
                <div className="iconBlock">
                <img src={comment} id="commentIcon" />
                <p className="tweetComm">Comment</p>
                </div>
                <div className="iconBlock">
                <img src={retweet} id="retweetIcon" />
                <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                <img src={share} id="shareIcon" />
                <p className="tweetShare">Share</p>
                </div>
                </div>
               
            </div>
    </>
}

export default Tweet;