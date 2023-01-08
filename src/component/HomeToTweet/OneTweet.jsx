import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ViewTweetsReply } from "../../react-redux/actions/Replies";
import Sidebar from "../Sidebar/SideBar";
import ToTweet from "./Tweet";
import "./tweet.css"

function OneTweet() {
    console.log(useParams())
    const { TweetId } = useParams();
    const [tweet, setTweet] = useState();
    const [showTweet, setShowTweet] = useState(false)
    const [replyArr, setReplyArr] = useState([])
    const { loading, tweetData, liked, bookmarked } = useSelector((s) => s.TweetFeedReducer)
    const {responseT, errorT, replyT} = useSelector((r) => r.ReplyReducer)
    console.log(responseT, errorT, replyT)
    const dispatch = useDispatch();
    useEffect(() => {
        tweetData.filter((t) => {
            if (t._id == TweetId) {
                setShowTweet(true)
                setTweet(t);
                return t;
            }
        }, [TweetId])
    })
    useEffect(()=>{
        dispatch(ViewTweetsReply(TweetId))
        setReplyArr(replyT)
    },[TweetId])
    console.log(tweet)
    console.log(replyArr)
    return <>
        <Sidebar />
        <div className="toTweetDiv">
            {showTweet ? (<ToTweet text={tweet.text} image={tweet.image} video={tweet.video} likeCount={parseInt(tweet.likes)} retweet={tweet.retweet}
                username={tweet.user.user_name} displaypic={tweet.user.displaypic} tweetId={tweet._id} />) : null}
        </div>
    </>
}


export default OneTweet