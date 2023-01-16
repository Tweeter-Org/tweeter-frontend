import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendChatsAction, ViewChatList, ViewChatsAction } from "../../react-redux/actions/Message";
import Sidebar from "../Sidebar/SideBar";
import ChatUser from "./ChatUser";
import MsgUser from "./User";
import avatar from "../Assets/avatar.svg"
import { useParams } from "react-router-dom";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import sendChatIcon from "../Assets/sendChats.svg";
import Picker from "emoji-picker-react"
import FormData from "form-data";

function Chats() {
    const [userN, setUserN] = useState("")
    const [userlist, setUesrlist] = useState([])
    const dispatch = useDispatch();
    function handleSearch(e) {
        setUserN(e.target.value)
    }
    const { chatLists, viewChatList, isActive, viewChatMsgs } = useSelector((c) => c.MsgSearchReducer)
    console.log(chatLists)
    console.log(viewChatMsgs)
    useEffect(() => {
        dispatch(ViewChatList())
        setUesrlist(chatLists)
        // console.log(viewChatList)
    }, [])
    // console.log(chatLists[0].users)
    useEffect(() => {
        document.getElementById("SEARCHBOX").style.display = "none";
    }, [])

    const [userChatList, setUserChatList] = useState([])
    const [list, setlist] = useState([])
    const { user } = useSelector((a) => a.AuthReducer)
    // console.log(userChatList)
    // console.log(useParams())
    const { userid } = useParams();
    useEffect(() => {
        if (isActive) {
            chatLists.map((ch) => {
                console.log(ch);
                // console.warn(ch.users)
                ch.users.map((c) => {
                    if (c.user_name != user.user_name)
                        // console.warn(c)
                    if (c._id == userid) {
                        console.log(c)
                        setlist(c)
                        console.log(list)
                         dispatch(ViewChatsAction(c.chatrel.chatId))
                        
                        // console.log(list.name)
                    }

                })
            })
        }
    }, [isActive, userid])

    const [textMsg, setTextMsg] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage] = useState(null);
    // const [imageInArr, setImageInArr] = useState(null)
    // const [vdoInArr, setVdoInArr] = useState(null)
    const fd = new FormData();
    function handleSendImage(e) {
        // var imageoutput = document.getElementById("imageOutput");
        // imageoutput.src = URL.createObjectURL(e.target.files[0])
        // setImageInArr(URL.createObjectURL(e.target.files[0]))
        setSendImage(e.target.files[0])
        // document.getElementById("imageOutput").style.display = "block"
    }
    const [sendVideo, setSendVideo] = useState(null);
    function handleSendVideo(e) {
        // var videooutput = document.getElementById("videoOutput");
        // videooutput.src = URL.createObjectURL(e.target.files[0])
        // setVdoInArr(URL.createObjectURL(e.target.files[0]))
        // console.log(URL.createObjectURL(e.target.files[0]))
        setSendVideo(e.target.files[0])
        // document.getElementById("VIDEO").style.display = "block"
        // document.getElementById("videoOutput").style.display = "block"
    }

    function handleEmojis() {
        setShowEmoji(!showEmoji)
    }

    function onemojiclick(emojiObject, event) {
        setTextMsg(prevText => prevText + emojiObject.emoji)
        setShowEmoji(false)
    }

    function sendChatMsg(id){
        console.log(id)
        fd.append("text", textMsg)
        fd.append("chatId",id)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        dispatch(SendChatsAction(fd))
        setTextMsg("")
    }
    useEffect(()=>{
        // dispatch(ViewChatsAction(list.chatrel.chatId))
    },[userid, list])
    console.log(viewChatMsgs)

    return <>
        <Sidebar />
        <div className='CHATS'>
            <div className="Chat2">
                <div className="ChatInfo2">
                    <img src={avatar} id="msgPicincircle" />
                    {/* {(list.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((list.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="msgPicincircle" />))
                } */}
                    <p className="msgName" id="ChatName">{list.name}</p>
                </div>
                <div>
                <form onSubmit={(e) => e.preventDefault()}
                enctype="multipart/form-data" >
                    <input className="ChatType2" type="text" value={textMsg} placeholder="Type a message" onChange={(e)=>{setTextMsg(e.target.value)}} />
                    <div className="Chat2-1">
                    <div>
                        <label for="chatuploadImg"><img src={imageIcon} className="chatImage" /></label>
                        <input type="file" id="chatuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
                       
                        <p><img id="imageOutput" width="200" /></p>
                    </div>
                    <div>
                        <label for="ctuploadVideo"><img src={videoIcon} className="chatVideo" /></label>
                        <input type="file" id="ctuploadVideo" accept="video/mp4, audio/mp4" onChange={handleSendVideo} hidden />
                       
                        <p><video id="VIDEO" width="200" controls>
                            <source id="videoOutput" width="200" type="video/mp4, audio/mp4" />
                        </video>
                        </p>
                    </div>
                    <div>
                        <img src={smileIcon} className="chatSmile" onClick={() => { handleEmojis() }} />
                        {showEmoji ? (<div className="chatemojipicker"><Picker width="300px" height="420px" theme="dark" onEmojiClick={onemojiclick} /></div>) : null}
                    </div>
                   <img className="sendchaticon" onClick={()=>{sendChatMsg(list.chatrel.chatId)}} src={sendChatIcon} />
                   
                </div>
                </form>
                </div>
            </div>
            <div className='Chat1'>
                <input className=" ChatSearch1 POPUPBG" type="text" value={userN} onChange={handleSearch} placeholder="Search" />
                <div className="ChatUserFlex">
                    {(!isActive && viewChatList) ? (chatLists.length > 0 ? (chatLists.map((chat) => {
                        console.log(chat)
                        return <ChatUser user={chat.users} msg={chat.latestmsg} />
                    })) : null) : null}
                    {isActive ? (
                        <div className="msgUser" id="ChatUser1" >
                            {/* {(list.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((list.displaypic.startsWith("https:")) ? (<img src={list.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${list.displaypic}`}  id="msgPicincircle" />))
                } */}
                            <div className="ChatUser2">
                                <p className="msgName">{list.name}</p>
                                <p className="msgUsername">{list.user_name}</p>
                                {/* <p className="msgUsername">{props.msg}</p> */}
                            </div>
                        </div>
                    ) : null}

                </div>
                {/* <div>
                {searchListArray.length > 0?( searchListArray.map((searchh) => {
                            return <MsgUser name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} />
                        })):null} 
                </div> */}
            </div>
        </div>
        {/* <span className='ChatLine1' /> */}
    </>
}
export default Chats;