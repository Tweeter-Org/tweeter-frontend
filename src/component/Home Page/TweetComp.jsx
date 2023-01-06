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
import deleteIcon from "../Assets/delete.svg"
import TweetDeleteAction from "../../react-redux/actions/deleteTweetAct";
import { TweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { type } from "@testing-library/user-event/dist/type";
import TweetPopup from "./tweetPopup";
import CreateTweet from "./createTweet";
import { Navigate, useNavigate } from "react-router-dom";

function Tweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const bookmarkShow = props.bookmarked
    const retweets= props.retweet;
    const dispatch = useDispatch();
    const [tweetCount, setTweetCount] = useState(props.likeCount)
    console.log(props.retweet)
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
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.2;
        }
    }
    const navigate = useNavigate()
    function handleRetweet (tweetid, name, image, video, text){
        dispatch(RetweetDetails(tweetid,name, video, text, image))
        sessionStorage.setItem("retweetId", tweetid)
        var retweetPath = document.getElementsByClassName("tweetRetweet")[id].style.color;
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CREATETWEET").style.scrollBehavior = "scroll"
        document.getElementById("CTRETWEETDIV").style.display="flex";
        document.getElementById("buttonTweet").style.display="none";
        document.getElementById("buttonRetweet").style.display="block";
        if (retweetPath === "white") {
            document.getElementsByClassName("tweetRetweet")[id].style.color = "green"
            document.getElementsByClassName("retweetIcon")[id].src = greenRetweet
        }
        else {
            document.getElementsByClassName("retweetIcon")[id].src = retweet
            document.getElementsByClassName("tweetRetweet")[id].style.color = "white"
        }
    }
  

    function showProfilePopup(){
        document.getElementsByClassName("tweetPopcomp")[id].style.display="block"
    }
    function hideProfilePopup(){
        document.getElementsByClassName("tweetPopcomp")[id].style.display="none"
    }
    const x = props.text.indexOf('#');
    const y = props.text.indexOf(' ')
    var index1=-1,index2=-1,str
    for(var i=0;i<props.text.length;i++){
        console.log("loop")
        if(props.text[i]=='#'){
            index1=i;
            console.log(index1)
            for(var j=index1+1;j<props.text.length+1;j++){
                if(props.text[j]==' '){
                    index2=j;
                    console.log("loop2")
                    console.log(index2)
                    break;
                }
            }
            str = props.text.substring(index1, index2)
            console.log(str)
        }
    }
   
    return <>
    {retweets==null?(  <div className="tweetComp POPUPBG">
            <div className="firstTweetBlock">
                {(props.displaypic === null) ? (<span className="displaypie"><img src={avatar} id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? (<span className="displaypie"><img src={props.displaypic} id="picincircle" /></span>) :
                        (<span className="displaypie"><img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="picincircle" /></span>))
                }
                <p className="username" onMouseOver={showProfilePopup} onMouseOut={hideProfilePopup} >{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" onClick={() => { handleTweetBookmark(props.tweetId) }} />
                <TweetPopup name={props.username} num={id}/>
            </div>
            {/* {image!=null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) :
            (image != [null] ? (<img src={image} alt="image" className="tweetImage" />)
             : null)} */}
            {image != null? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) : null}
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
                    <img src={comment} id="commentIcon" />
                    <p className="tweetComm">Comment</p>
                </div>
                <div className="iconBlock"> 
                    <img src={retweet} className="retweetIcon" onClick={()=>handleRetweet(props.tweetId, props.username, image, video, props.text)} />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon" />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
        </div>):(  <div className="tweetComp POPUPBG" id="tweetRet">
        <div className="firstTweetBlock">
                {(props.displaypic === null) ? (<span className="displaypie"><img src={avatar} id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? (<span className="displaypie"><img src={props.displaypic} id="picincircle" /></span>) :
                        (<span className="displaypie"><img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="picincircle" /></span>))
                }
                <p className="username" onMouseOver={showProfilePopup} onMouseOut={hideProfilePopup} >{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" onClick={() => { handleTweetBookmark(props.tweetId) }} />
                <TweetPopup name={props.username} num={id}/>
            </div>
            {(image != null || image!=[null]) ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />) : null}
            {(video != null || video!=[null]) ? <video className="tweetvideo" controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            <div className="tweetWithRetwwet">
            <div className="TWRBlock1">
            {(retweets.user.displaypic === null) ? (<img src={avatar} className="TWRpic" />) :
                    ((retweets.user.displaypic.startsWith("https:")) ? (<img src={retweets.user.displaypic}  className="TWRpic"/>) :
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
        </div>)}
        <CreateTweet/>
    </>
}

export default Tweet;