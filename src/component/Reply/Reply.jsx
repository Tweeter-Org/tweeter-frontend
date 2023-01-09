import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../Assets/avatar.svg";
import like from "../Assets/like.svg";
import share from "../Assets/send.svg";
import comment from "../Assets/tweetComm.svg";
import retweet from "../Assets/retweet.svg";
import { useDispatch, useSelector } from "react-redux";
import { ViewRepliesToReply } from "../../react-redux/actions/Replies";
import Reply2 from "./Reply2";

function Reply(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { responseT, errorT, replyR, loading } = useSelector((r) => r.ReplyReducer)
    console.log(replyR)
    const [replyArr, setReplyArr] = useState([])
    const [replyArr2, setReplyArr2] = useState([])

    useEffect(()=>{
        dispatch(ViewRepliesToReply(props.num))
        setReplyArr2(replyR)
    },[props.num])
    function handleReplytoReply(id){
        console.log(id)
        console.log(props.replyingto)
        dispatch(ViewRepliesToReply(id))
        setReplyArr(replyR)
        if(replyR.length>0)
        document.getElementsByClassName("RepShowMore")[props.indexx].style.display="none";
    }
    console.log(props.replyingto)
    console.log(replyArr2)
    return <>
        <div className="ReplyDiv">
            <div className="Reply1">
                {(props.displaypic === null) ? (<img src={avatar} id="RepAvatar" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} />) :
                        (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} />))
                }
                <p id="RepName">{props.username}</p>
            </div>
            <p id="RepReply">Replying to {props.replyingto.length>0?(props.replyingto.map((name)=>{
                return <span id="RepAtName" onClick={()=>{console.log(`/profile/${name}`)
                navigate(`/profile/${name}`)}}>@{name}</span>
            })):null}</p>
            {props.image != null ? (<img src={`https://twitterbackend-production-93ac.up.railway.app/${props.image}`} id="RepImage" alt="image" />) : null}
            {props.video != null ? <video controls>
                <source src={`https://twitterbackend-production-93ac.up.railway.app/${props.video}`} id="RepImage" type="video/mp4" />
            </video> : null}
            <p className="RepText">{props.text}</p>
            <div className="secondTweetBlock" id="ReplyIconBlock">
                <div className="iconBlock">
                    <img src={like} className="likeIcon" id="ReplyLike" />
                    <p className="tweetLike" id="RTLike">Like</p>
                </div>
                <div className="iconBlock">
                <img src={comment} id="ReplyComm" />
                    {/* <img src={comment} id="commentIcon" onClick={()=>{handleTweetReply(props.tweetId, props.username, image, video, props.text)}} /> */}
                    <p className="tweetComm" id="RTLike">Comment</p>
                </div>
                <div className="iconBlock"> 
                <img src={retweet} className="retweetIcon"  id="ReplyRet" />
                    {/* <img src={retweet} className="retweetIcon" onClick={()=>handleRetweet(props.tweetId, props.username, image, video, props.text)} /> */}
                    <p className="tweetRetweet" id="RTLike">Retweet</p>
                </div>
                <div className="iconBlock">
                    <img src={share} id="ReplyShare" />
                    <p className="tweetShare" id="RTLike">Share</p>
                </div>
            </div>
            <p className="RepShowMore" onClick={()=>{handleReplytoReply(props.num)}}>...Show more</p>
            {replyArr.length>0? (replyArr.map((rep)=>{
                return <Reply2 text={rep.text} image={rep.image} video={rep.video} username={rep.user.user_name}
                 displaypic={rep.user.displaypic} num={rep.id} replyingto={rep.replyingto} />
            })):null}
            {/* {replyArr2.length>0? <p className="RepShowMore" onClick={()=>{handleReplytoReply(props.num)}}>...Show more</p>:null} */}
           
        </div>
    </>
}
export default Reply;