import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TweetFeedAction } from "../../react-redux/actions/TweetsFeedAct";
import Sidebar from "../Sidebar/SideBar";
import "./homepage.css";
import Tweet from "./TweetComp";
import { Spinner } from 'react-bootstrap';

function HomePage (){
    const dispatch = useDispatch();

    const {loadingTweet, tweetData} = useSelector((s)=>s.TweetFeedReducer)

    const [tweetArray, setTweetArray] = useState("");
    useEffect(()=>{
        dispatch(TweetFeedAction())
    },[])
   console.log(tweetData)
   const tweetLength = tweetData.length
console.log(tweetArray)

useEffect(()=>{
    if(loadingTweet===true){
        document.body.style.opacity = 0.5;
    }
    else{
        document.body.style.opacity = 1;
    }
},[loadingTweet])

    return <>
    <Sidebar />
    <div className="tweetFlexBox poopupbg3">
    {tweetLength>0?(tweetData.map((tweet, index)=>{
        return <Tweet text={tweet.text} image={tweet.image} video={tweet.video} username={tweet.user.user_name} tweetId={tweet._id} number={index} />;
    })):null}
    </div>
    {(loadingTweet===true)?<Spinner animation="border" variant="light" id="loadSpinner" />:null}
    </>
}
export default HomePage