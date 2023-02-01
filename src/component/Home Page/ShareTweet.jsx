import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MsgSearchUser, { ViewChatList } from "../../react-redux/actions/Message";
import ShareTweetUser from "./ShareTweetUser";
import deleteIcon from "../Assets/delete.svg"


function ShareTweet() {
    const [search, setSearch] = useState("")
    const chatReducer = useSelector((c) => c.MsgSearchReducer)
    const { chatLists, viewChatList, isActive, chatBool, sendChatMessage, viewChatMsgs, loading } = chatReducer
    const [info, setInfo] = useState([])
    const [sideChats, setSideChats] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ViewChatList())
    }, [])
    useEffect(() => {
        if (viewChatList) {
            setSideChats(chatLists)
        }
    }, [chatReducer])

    function setOPacity() { /*SET BACKGROUND OPACITY*/
    var items = document.getElementsByClassName("POPUPBG")
    for (var i = 0; i < items.length; i++) {
        document.getElementsByClassName("POPUPBG")[i].style.opacity = 1;
    }
}

    return <>
        <div className="shareTweetDiv" id="SHAREBLOCK">
        <div className="shareePopup" id="shareBlock1">
            <p className="shareTweetText">Share with</p>
            <hr className="shareTweetLine" id="msgLine" />
            </div>
            <div onClick={() => {
                document.getElementById("SHAREBLOCK").style.display = "none"
                setOPacity();
            }}>
            <img src={deleteIcon} className="msgDelete" id="msgDltIcon" /></div>
          
            <div className="shareTweetFlexbox">
            {(viewChatList) ? (chatLists.length > 0 ? (chatLists.map((chat, index) => {
                      
                        return <ShareTweetUser user={chat.users} msg={chat.latestmsg} indexx={index} viewChatid={chat._id} />
                    })) : null) : null}
                {/* {info.length > 0 ? (info.map((searchh) => {
                    return <ShareTweetUser name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} userNum={searchh._id} />
                })) : null} */}
            </div>
        </div>
    </>
}

export default ShareTweet;