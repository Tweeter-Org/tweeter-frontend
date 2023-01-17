import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function ScrollableChat() {
    const { chatLists, viewChatList, isActive, viewChatMsgs } = useSelector((c) => c.MsgSearchReducer)
    const {user} = useSelector((a)=>a.AuthReducer)
    console.warn(viewChatMsgs)
    const [chatmsg, setChatmsg] = useState([])
    const setScrollbar = useRef(null)
    useEffect(()=>{
setScrollbar.current?.scrollIntoView();
    },[chatmsg])
    useEffect(() => {
        setChatmsg(viewChatMsgs)
    }, [viewChatMsgs])
    return <>
        <div className="Chat2Msgs">
                {chatmsg.length > 0 ? (chatmsg.map((chat) => {
                    if(chat.user.user_name != user.user_name){
                        return (
                        <div className="scrollChatBlockYou">
                        <p className="scrollChatText">{chat.text}</p>
                    </div>)
                    }
                    else{
                        return (
                            <div className="scrollChatBlockMine" >
                        <p className="scrollChatText">{chat.text}</p>
                    </div>) 
                    }
                })) : null}

                <div ref={setScrollbar} />
            </div>
    </>
}

export default ScrollableChat;