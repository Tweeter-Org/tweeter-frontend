import React from "react";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";

function Tweet(props) {
    const video = props.video
    const image = props.image
    return <>
    {(image!=null || video!=null)?(
        <div className="tweetComp">
            <span className="displaypie" />
            <p className="username">{props.username}</p>
            {image!=null?(<img src={`https://twitterbackend-production-93ac.up.railway.app/${image}`} alt="image" className="tweetImage" />):null}
           
           <p className="tweetText">{props.text}</p>
            {(image===null && video===null)?<p className="tweetText2">{props.text}</p>:null}
            {video!=null?<video className="tweetvideo" controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${video}`} type="video/mp4" />
            </video>:null}
            <img src={like} id="likeIcon" />
            <p className="tweetLike">Like</p>
            <img src={comment} id="commentIcon" />
            <p className="tweetComm">Comment</p>
            <img src={retweet} id="retweetIcon" />
            <p className="tweetRetweet">Retweet</p>
            <img src={share} id="shareIcon" />
            <p className="tweetShare">Share</p>
        </div>
    ):(
        <div className="tweetComp" id="tweetComp2">
            <span className="displaypie"/>
            <p className="username">{props.username}</p>
           <p className="tweetText2">{props.text}</p>
            <img src={like} id="likeIcon2" />
            <p className="tweetLike" id="tweetLike2">Like</p>
            <img src={comment} id="commentIcon2" />
            <p className="tweetComm" id="tweetComm2">Comment</p>
            <img src={retweet} id="retweetIcon2" />
            <p className="tweetRetweet" id="tweetRetweet2">Retweet</p>
            <img src={share} id="shareIcon2" />
            <p className="tweetShare" id="tweetShare2">Share</p>
        </div> 
    )}
        
    </>
}

export default Tweet;