import React, { createRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function ScrollableChat(props) {
    const { chatLists, viewChatList, isActive, viewChatMsgs } = useSelector((c) => c.MsgSearchReducer)
    const { user } = useSelector((a) => a.AuthReducer)
    // console.warn(viewChatMsgs)
    // console.log(props.chatMessage)
    const [chatmsg, setChatmsg] = useState([])
    const setScrollbar = useRef(null)
    useEffect(() => {
        setScrollbar.current?.scrollIntoView();
    }, [chatmsg])
    // useEffect(() => {
    //     setChatmsg(viewChatMsgs)
    // }, [viewChatMsgs])
    const scrolldiv = createRef();
    useEffect(() => {
        const scrollToBottom = (node) => {
            node.scrollTop = node.scrollHeight;
        };
        scrollToBottom(scrolldiv.current);
    });
    
    return <>
        <div className="Chat2Msgs" id="SCROLLCHATS" ref={scrolldiv}>
            {props.chatMessage.length > 0 ? (props.chatMessage.map((chat) => {
                if (chat.user.user_name != user.user_name) {
                    return (
                        <div className="scrollChatBlockYou" id="SCROLL1">
                            <p className="scrollChatText">{chat.text}</p>
                            {(chat.image != null && chat.image.startsWith("blob:")) ? (
                                <img src={chat.image} alt="image" className="chatImageShow" />) : (
                                chat.image != null ? (<img src={chat.image} alt="image" className="chatImageShow" />) : null)}

                            {(chat.video != null && chat.video.startsWith("blob:")) ? (
                                <video className="chatImageShow" controls>
                                    <source src={chat.video} type="video/mp4" />
                                </video>) : (
                                chat.video != null ? (<video className="chatImageShow" controls>
                                    <source src={chat.video} type="video/mp4" />
                                </video>) : null)}

                            {chat.tweet != null ?(<div className="chatTweet">
                                <div className="chTw1">
                                <img className="chTwProfile" src={chat.tweet.user.displaypic} />
                                    <p className="chTwName1">{chat.tweet.user.name}</p>
                                    <p className="chTwName2">@{chat.tweet.user.user_name}</p>
                                </div>
                               <p className="chTwText">{chat.tweet.text}</p>
                                {chat.tweet.image != null ? (<img src={chat.tweet.image} alt="image" className="chTwImage" />) : null}
                                {(chat.tweet.video != null) ? (
                                    <video className="chTwvideo" controls>
                                        <source src={chat.tweet.video} type="video/mp4" />
                                    </video>) : (null)}

                            </div>) : null}
                        </div>)
                }
                else {
                    return (
                        <div className="scrollChatBlockMine" id="SCROLL1" >
                            <p className="scrollChatText">{chat.text}</p>
                            {(chat.image != null && chat.image.startsWith("blob:")) ? (
                                <img src={chat.image} alt="image" className="chatImageShow" />) : (
                                chat.image != null ? (<img src={chat.image} alt="image" className="chatImageShow" />) : null)}

                            {(chat.video != null && chat.video.startsWith("blob:")) ? (
                                <video className="chatImageShow" controls>
                                    <source src={chat.video} type="video/mp4" />
                                </video>) : (
                                chat.video != null ? (<video className="chatImageShow" controls>
                                    <source src={chat.video} type="video/mp4" />
                                </video>) : null)}

                            {chat.tweet != null ? (<div className="chatTweet">
                                <div className="chTw1">
                                    <img className="chTwProfile" src={chat.tweet.user.displaypic} />
                                    <p className="chTwName1">{chat.tweet.user.name}</p>
                                    <p className="chTwName2">@{chat.tweet.user.user_name}</p>
                                </div>
                               <p className="chTwText">{chat.tweet.text}</p>
                                {chat.tweet.image != null ? (<img src={chat.tweet.image} alt="image" className="chTwImage" />) : null}
                                {(chat.tweet.video != null) ? (
                                    <video className="chTwvideo" controls>
                                        <source src={chat.tweet.video} type="video/mp4" />
                                    </video>) : (null)}

                            </div>) : null}
                        </div>)
                }
            })) : null}
            {/* {props.allchats.length > 0 ? (props.allchats.map((chat) => {
                if (chat.user.user_name != user.user_name) {
                    return (
                        <div className="scrollChatBlockYou">
                            <p className="scrollChatText">{chat.text}</p>
                            {(chat.image != null && chat.image.startsWith("blob:")) ? (
                                <img src={chat.image} alt="image" className="chatImageShow" />) : (
                                chat.image != null ? (<img src={`https://tweeter-backend-7ngr.onrender.com/${chat.image}`} alt="image" className="chatImageShow" />) : null)}

                            {(chat.video != null && chat.video.startsWith("blob:")) ? (
                                <video className="chatImageShow" controls>
                                    <source src={chat.video} type="video/mp4" />
                                </video>) : (
                                chat.video != null ? (<video className="chatImageShow" controls>
                                    <source src={`https://tweeter-backend-7ngr.onrender.com/${chat.video}`} type="video/mp4" />
                                </video>) : null)}
                        </div>)
                }
                else {
                    return (
                        <div className="scrollChatBlockMine" >
                            <p className="scrollChatText">{chat.text}</p>
                            {(chat.image != null && chat.image.startsWith("blob:")) ? (
                                <img src={chat.image} alt="image" className="chatImageShow" />) : (
                                chat.image != null ? (<img src={`https://tweeter-backend-7ngr.onrender.com/${chat.image}`} alt="image" className="chatImageShow" />) : null)}

                            {(chat.video != null && chat.video.startsWith("blob:")) ? (
                                <video className="chatImageShow" controls>
                                    <source src={chat.video} type="video/mp4" />
                                </video>) : (
                                chat.video != null ? (<video className="chatImageShow" controls>
                                    <source src={`https://tweeter-backend-7ngr.onrender.com/${chat.video}`} type="video/mp4" />
                                </video>) : null)}
                        </div>)
                }
            })) : null} */}
            {/* <div id="scrollBarDiv" ref={setScrollbar} /> */}
        </div>

    </>
}

export default ScrollableChat;