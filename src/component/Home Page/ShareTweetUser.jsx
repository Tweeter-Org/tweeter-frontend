import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { ActiveUserList, CreateChat } from "../../react-redux/actions/Message";
import { Messages } from "../../react-redux/actions/SearchApi";
import { ShareTweet } from "../../react-redux/actions/ShareTweet";
import avatar from "../Assets/avatar.svg"
import greenmessage from "../Assets/greenmsg.svg"
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShareTweetUser(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tweetId = sessionStorage.getItem("shareTweetId")
    // console.log(tweetId)

    const { createChatList } = useSelector((m) => m.MsgSearchReducer)
    const shared = useSelector((m) => m.ShareTweetRed)
    // console.log(createChatList)

    function handleShareUser(usernum) {
        dispatch(CreateChat(usernum))
        console.log(createChatList.chat._id)

        const data = {
            "tweetId": sessionStorage.getItem("shareTweetId"),
            "chatId": createChatList.chat._id
        }
        console.log(data)
        dispatch(ShareTweet(data))
        document.getElementById("SHAREBLOCK").style.display="none"
    }
    // useEffect(() => {
    //     console.log(shared.sharedSuccess)
    //     if (shared.sharedSuccess)
    //     {
    //         toast.success("Message sent successfully", {
    //             position: "top-center",
    //             theme: "light",
    //         });
    //     }
           
    // }, [shared])


    return <>
        <div className="shareUser POPUPBG">
            {(props.displaypic === null) ? (<img src={avatar} id="sharePicincircle" />) :
                ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="sharePicincircle" />) :
                    (
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`} id="sharePicincircle" />))
            }
            <div className="shareUser2">
                <p className="shareName">{props.name}</p>
                <p className="shareUsername" onClick={() => {
                    handleShareUser(props.userNum)
                }}>{props.username}</p>
            </div>
        </div>
        <ToastContainer />
    </>
  
}

export default ShareTweetUser