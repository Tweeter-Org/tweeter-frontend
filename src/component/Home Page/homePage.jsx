import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import Sidebar from "../Sidebar/SideBar";
import "./homepage.css";
import Tweet from "./TweetComp";
import { Spinner } from 'react-bootstrap';
import Loader from "../Assets/Loader.jsx";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage (){
    const dispatch = useDispatch();

    const {loading, tweetData, liked} = useSelector((s)=>s.TweetFeedReducer)
    const {response} = useSelector((t)=>t.TweetCreateReducer)
    useEffect(()=>{
        dispatch(TweetFeedAction())
    },[])
   console.log(tweetData)
   console.log(liked)
   const tweetLength = tweetData.length

const auth = useSelector((s)=>s.AuthReducer)
const {user, toFgtPwd} = auth;
const nameInApi = user.user_name
sessionStorage.setItem("usernameInApi",nameInApi)
useEffect(()=>{
    if(loading===true){
        document.body.style.opacity = 0.5;
    }
    else{
        document.body.style.opacity = 1;
    }
},[loading])
    return <>
    <Sidebar />
    
    <div className="tweetFlexBox POPUPBG">
    {tweetLength>0?(tweetData.map((tweet, index)=>{
        const likes= liked[index]
        console.log(likes)
        return <Tweet text={tweet.text} image={tweet.image} video={tweet.video} likeCount={parseInt(tweet.likes)} retweet={tweet.retweet} username={tweet.user.user_name} displaypic={tweet.user.displaypic} tweetId={tweet._id} number={index} bookmarkb ="false" LIKES= {likes} />;
    })):null}
    </div>
    {(loading===true)?<Loader loading={loading} />:null}
    <ToastContainer />
    </>
}
export default HomePage