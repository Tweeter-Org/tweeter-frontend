import React, { useEffect } from "react";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import avatar from "../Assets/avatar.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetLikeAction from "../../react-redux/actions/TweetLikeAction";

function Tweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const dispatch = useDispatch();
    const { response, isLiked } = useSelector((l) => l.TweetLikeReducer)
    function handleTweetLike(tweetid) {
        dispatch(TweetLikeAction(tweetid))
        if (isLiked) {
            if (response === "Liked") {
                document.getElementById("likeIcon").style.color = "green"
                document.getElementsByClassName("tweetLike")[id].style.color = "green"
            }
            if (response === "Unliked") {
                document.getElementsByClassName("tweetLike")[id].style.color = "white"
                document.getElementById("likeIcon").style.color = "  rgba(255, 255, 255, 0.8)"
            }

        }
    }

    return <>
            <div className="tweetComp">
            <div className="firstTweetBlock">
            {props.displaypic!=null?(<span className="displaypie"><img src={props.displaypic} id="picincircle"/></span>):
            (<span className="displaypie"><img src={avatar} id="picincircle"/></span>)}
            {/* <span className="displaypie"><img src={props.displaypic} /></span> */}
                <p className="username">{props.username}</p>
            </div>
               
                {image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) : null}
                {video != null ? <video className="tweetvideo" controls>
                    <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
                </video> : null}
                <p className="tweetText">{props.text}</p>
                <div className="secondTweetBlock">
                <div className="iconBlock">
                <img src={like} id="likeIcon" onClick={() => { handleTweetLike(props.tweetId) }} />
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