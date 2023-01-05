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
import TweetLikeAction from "../../react-redux/actions/Tweets.jsx";
import greenLike from "../Assets/greenLike.svg"
import greenComment from "../Assets/greenComment.svg"
import greenRetweet from "../Assets/greenRetweet.svg"
import greenShare from "../Assets/greenSend.svg"
import greenBookmarks from "../Assets/greenBookmarks.svg"
import greencross from "../Assets/greencross.svg"
import DoBookmarkAction from "../../react-redux/actions/Bookmarks.jsx";
import deleteIcon from "../Assets/delete.svg"
import TweetDeleteAction, { FakeTweetDeleteAction } from "../../react-redux/actions/deleteTweetAct";
import { TweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { type } from "@testing-library/user-event/dist/type";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileTweet(props) {
    const video = props.video
    const image = props.image
    const id = props.number;
    const bookmarkShow = props.bookmarkb
    const retweets = props.retweet;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    // const number = parseInt(props.likeCount)
    const [tweetCount, setTweetCount] = useState(props.likeCount)
    const { response, isLiked, isDelete } = useSelector((l) => l.TweetLikeReducer)

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
    const {deleteTweet, errorTweet, deleteSym} = useSelector((d)=>d.DeleteTweetsPReducer)
    const { profile, accessProfile, loading , editprofile,ifedit , profileTweet} = useSelector((p) => p.ProfileReducer)
    const {myprofile} = profile;
    
    function handleTweetDelete(tweetid) {
        document.getElementsByClassName("deleteIcon")[id].src = greencross
        dispatch(TweetDeleteAction(tweetid))
        dispatch(FakeTweetDeleteAction(tweetid))
        if(deleteTweet!==""){
            toast.success(`${deleteTweet}`, {
                position: "top-center",
                theme: "light",
                });
        }
        else if(errorTweet!==""){
            toast.error(`${errorTweet}`, {
                position: "top-center",
                theme: "light",
                });
        }
        if (deleteSym) {
            if (deleteTweet === "Deleted tweet") {
                document.getElementsByClassName("deleteIcon")[id].src = deleteIcon
            }
           else {
                document.getElementsByClassName("deleteIcon")[id].src = greencross
            }
        }
    }
console.log(profileTweet)
    useEffect(() => {
        if (bookmarkShow === "true") {
            document.getElementsByClassName("bookmarkIcon")[id].src = greenBookmarks
        }
        else {
            document.getElementsByClassName("bookmarkIcon")[id].src = bookmark
        }
    }, [bookmarkShow])
    return <>
    {retweet==null?(<div className="tweetComp POPUPBG" id="profileTweetComp">
            <div className="firstTweetBlock">
                {(props.displaypic === null) ? (<span className="displaypie"><img src={avatar} id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? (<span className="displaypie"><img src={props.displaypic} id="picincircle" /></span>) :
                        (<span className="displaypie"><img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="picincircle" /></span>))
                }
                <p className="username">{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" id="bmIcon" onClick={() => { handleTweetBookmark(props.tweetId) }} />
               {myprofile?<img src={deleteIcon} className="deleteIcon" id="delIcon" onClick={() => {handleTweetDelete(props.tweetId)}} />:null}
            </div>

            {image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" id="ProfileImage"/>) : null}
            {video != null ? <video className="tweetvideo" id="ProfileVideo" controls>
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
                    <img src={retweet} id="retweetIcon" />
                    <p className="tweetRetweet">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="shareIcon" />
                    <p className="tweetShare">Share</p>
                </div>
            </div>
        </div>):(   <div className="tweetComp POPUPBG" id="profileTweetComp">
            <div className="firstTweetBlock">
                {(props.displaypic === null) ? (<span className="displaypie"><img src={avatar} id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? (<span className="displaypie"><img src={props.displaypic} id="picincircle" /></span>) :
                        (<span className="displaypie"><img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="picincircle" /></span>))
                }
                <p className="username">{props.username}</p>
                <img src={bookmark} className="bookmarkIcon" id="bmIcon" onClick={() => { handleTweetBookmark(props.tweetId) }} />
               {myprofile?<img src={deleteIcon} className="deleteIcon" id="delIcon" onClick={() => {handleTweetDelete(props.tweetId)}} />:null}
            </div>

            {image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" id="ProfileImage"/>) : null}
            {video != null ? <video className="tweetvideo" id="ProfileVideo" controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
            </video> : null}
            <p className="tweetText">{props.text}</p>
            {/* <div className="tweetWithRetwwet">
        {(retweets.image != null) ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${retweets.image}`} className="TWRVideo" alt="image" />) : null}
            {(retweets.video != null) ? <video controls className="TWRVideo">
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${retweets.video}`} type="video/mp4" />
            </video> : null}
            <p className="TWRText" >{retweets.text}</p>
        </div> */}
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
     
        <ToastContainer />
    </>
}

export default ProfileTweet;