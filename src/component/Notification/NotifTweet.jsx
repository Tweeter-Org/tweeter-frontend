import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ViewNotifyTweet } from "../../react-redux/actions/Notifications";
import { ViewTweetsReply } from "../../react-redux/actions/Replies";
import ToTweet from "../Reply/Tweet";
import Sidebar from "../Sidebar/SideBar";
// import ToTweet from "./Tweet";
// import "./tweet.css"

function NotifTweet() {
    console.log(useParams())
    const { TweetId } = useParams();
    const [tweet, setTweet] = useState();
    const [showTweet, setShowTweet] = useState(false)
    const [replyArr, setReplyArr] = useState([])
    const { loading, tweetData, liked, bookmarked } = useSelector((s) => s.TweetFeedReducer)
    const {responseT, errorT, replyT} = useSelector((r) => r.ReplyReducer)
    const {notifTweet} = useSelector((n)=>n. NotificationReducer)
    console.log(responseT, errorT, replyT)
    console.log(replyT)
    console.log(tweetData)
    const dispatch = useDispatch();
   
    useEffect(()=>{
        dispatch(ViewNotifyTweet(TweetId))
        console.log(notifTweet)
    },[TweetId])
    useEffect(()=>{
        dispatch(ViewTweetsReply(TweetId))
        setReplyArr(replyT)
    },[TweetId])
    console.log(tweet)
    console.log(replyArr)
    return <>
        <Sidebar />
        <div className="toTweetDiv">
            {notifTweet ? (<ToTweet text={notifTweet.text} image={notifTweet.image} video={notifTweet.video}
             likeCount={parseInt(notifTweet.likes)} retweet={notifTweet.retweet}
              name={notifTweet.user.name}  username={notifTweet.user.user_name} displaypic={notifTweet.user.displaypic} 
              tweetId={notifTweet._id} />) : null}
        </div>
    </>
}


export default NotifTweet