import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import Sidebar from "../Sidebar/SideBar";
import "./homepage.css";
import Tweet from "./TweetComp";
import { Spinner } from 'react-bootstrap';

function HomePage (){
    const dispatch = useDispatch();

    const {loading, tweetData, liked} = useSelector((s)=>s.TweetFeedReducer)

    useEffect(()=>{
        dispatch(TweetFeedAction())
    },[])
   console.log(tweetData)
   console.log(liked)
   const tweetLength = tweetData.length
   
   const [load, setLoad] = useState(loading)
   useEffect(()=>{
      if(tweetLength>0)
      setLoad(false)
  },[tweetLength])

useEffect(()=>{
    if(load===true){
        document.body.style.opacity = 0.5;
    }
    else{
        document.body.style.opacity = 1;
    }
},[load])

    return <>
    <Sidebar />
    
    <div className="tweetFlexBox poopupbg3">
    {tweetLength>0?(tweetData.map((tweet, index)=>{
        const likes= liked[index]
        console.log(likes)
        return <Tweet text={tweet.text} image={tweet.image} video={tweet.video} likeCount={tweet.likes} username={tweet.user.user_name} displaypic={tweet.user.displaypic} tweetId={tweet._id} number={index} bookmarkb ="false" LIKES= {likes} />;
    })):null}
    </div>
    {(load===true)?<Spinner animation="border" variant="light" id="loadSpinner" />:null}
    </>
}
export default HomePage