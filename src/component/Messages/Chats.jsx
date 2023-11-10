import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FakeViewChatsAction,
  SendChatsAction,
  ViewChatList,
  ViewChatsAction,
} from "../../react-redux/actions/Message";
import Sidebar from "../Sidebar/SideBar";
import ChatUser from "./ChatUser";
import MsgUser from "./User";
import avatar from "../Assets/avatar.svg";
import { useNavigate, useParams } from "react-router-dom";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import sendChatIcon from "../Assets/sendChats.svg";
import Picker from "emoji-picker-react";
import FormData from "form-data";
import ScrollableChat from "./ScrollableChats";
import searchIcon from "../Assets/search.svg";
import Loader from "../Assets/Loader";
import { io } from "socket.io-client";
import { AddChatNotify } from "../../react-redux/actions/Notifications";
import NoChats from "./NoChats";
import SearchChatUser from "./SearchChatPopUp";
import deleteIcon from "../Assets/delete.svg";
// import { Socket } from "socket.io-client";

const ENDPOINT = "https://tweeter.devalan.tech/";
var socket, currentChattingWith;
function Chats() {
  const [socketConnected, setSocketConnected] = useState(false);
  const { user } = useSelector((a) => a.AuthReducer);
  const { userid } = useParams();
  const chatReducer = useSelector((c) => c.MsgSearchReducer);
  const {
    chatLists,
    viewChatList,
    isActive,
    chatBool,
    sendChatMessage,
    viewChatMsgs,
    loading,
  } = chatReducer;
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const [sideChats, setSideChats] = useState([]);
  const [topName, setTopName] = useState("");
  const [topPic, setTopPic] = useState("");
  const [sendChatId, setSendChatId] = useState();

  useEffect(() => {
    document.getElementById("SEARCHBOX").style.display = "none";
  }, []);
  useEffect(() => {
    dispatch(ViewChatList());
  }, []);
  useEffect(() => {
    if (viewChatList) {
      setSideChats(chatLists);
    }
  }, [chatReducer]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("connection", () => {
      setSocketConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isNaN(parseInt(userid))) {
      document.getElementById("NOCHATBLOCK").style.display = "flex";
      document.getElementById("SCROLLCHATS").style.display = "none";
      document.getElementById("CHATTYPE").style.visibility = "hidden";
    } else {
      document.getElementById("NOCHATBLOCK").style.display = "none";
      document.getElementById("SCROLLCHATS").style.display = "flex";
      document.getElementById("CHATTYPE").style.visibility = "visible";
    }
  }, [userid]);
  const [chatMsgs, setChatMsgs] = useState([]);
  useEffect(() => {
    if (isActive) {
      if (viewChatList) {
        chatLists.map((chatt) => {
          chatt.users.map((chatUser) => {
            if (chatUser._id == userid) {
              setTopName(chatUser.name);
              setTopPic(chatUser.displaypic);
              setSendChatId(chatt._id);
              currentChattingWith = chatt._id;
              dispatch(ViewChatsAction(chatt._id));
            }
          });
        });
      }
    }
  }, [userid, chatLists, viewChatList, isActive]);

  useEffect(() => {
    if (chatBool) {
      setChatMsgs(viewChatMsgs);
    }
  }, [chatReducer]);

  const [textMsg, setTextMsg] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [sendImage, setSendImage] = useState(null);
  const [imageInArr, setImageInArr] = useState(null);
  const [vdoInArr, setVdoInArr] = useState(null);
  const [newChatMsg, setNewChatMsg] = useState("");
  const [notifs, setNotifs] = useState([]);

  const fd = new FormData();
  function handleSendImage(e) {
    setSendImage(e.target.files[0]);
    setImageInArr(URL.createObjectURL(e.target.files[0]));
  }
  const [sendVideo, setSendVideo] = useState(null);
  function handleSendVideo(e) {
    setSendVideo(e.target.files[0]);
    setVdoInArr(URL.createObjectURL(e.target.files[0]));
  }

  function handleEmojis() {
    setShowEmoji(!showEmoji);
  }

  function onemojiclick(emojiObject, event) {
    setTextMsg((prevText) => prevText + emojiObject.emoji);
    setShowEmoji(false);
  }

  const sendChat = {
    image: imageInArr,
    // "chatId": sendChatId,
    text: textMsg,
    video: vdoInArr,
    user: {
      user_name: user.user_name,
      displaypic: user.displaypic,
      name: user.name,
      _id: user._id,
    },
  };

  function sendChatMsg(chattid) {
    fd.append("text", textMsg);
    fd.append("chatId", chattid);
    if (sendImage != "") {
      fd.append("file", sendImage);
    } else if (sendVideo != "") {
      fd.append("file", sendVideo);
    } else {
      fd.append("file", null);
    }
    if (socket.connected && textMsg != "") {
      dispatch(SendChatsAction(fd, socket));
      // setChatMsgs([...chatMsgs, sendChat])
      dispatch(FakeViewChatsAction(sendChat));
    }
    if (!socket.connected) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);

      socket.on("connection", () => {
        setSocketConnected(true);
      });
    }
    setTextMsg("");
    setSendImage(null);
    setSendVideo(null);
  }

  // sockets : recieving new messages
  useEffect(() => {
    socket.on("message recieved", (newChatMsgRecieved) => {
      if (
        newChatMsgRecieved.chat._id !== currentChattingWith ||
        !currentChattingWith
      ) {
        if (!notifs.includes(newChatMsgRecieved)) {
          handleNotify(newChatMsgRecieved);
        }

        setNewChatMsg(newChatMsgRecieved);
      } else {
        // setNewChatMsg(newChatMsgRecieved)
        dispatch(FakeViewChatsAction(newChatMsgRecieved));
        setChatMsgs([newChatMsgRecieved, ...chatMsgs]);
        // setAllChats([...allChats, newChatMsgRecieved])
      }
    });
  }, []);

  //Notifications handler : if not current user
  const handleNotify = (new_unseen_chat) => {
    dispatch(AddChatNotify(new_unseen_chat));
  };

  useEffect(() => {
    if (loading === true) {
      document.body.style.opacity = 0.5;
    } else {
      document.body.style.opacity = 1;
    }
  }, [loading]);
  const navigate = useNavigate();
  return (
    <>
      <Sidebar />
      <div className="CHATS POPUPBG">
        <div className="Chat2">
          <div className="ChatInfo2">
            <img
              src={topPic ? topPic : avatar}
              id="msgPicincircle"
              alt="user"
              style={{ width: "38px" }}
            />
            <p className="msgName" id="ChatName">
              {topName}
            </p>
            <img
              src={searchIcon}
              className="chatSearch"
              alt="user"
              onClick={() => {
                document.getElementById("SELECT_CHAT_BLOCK").style.display =
                  "flex";
              }}
            />
          </div>
          <div>
            <ScrollableChat chatMessage={chatMsgs} />
          </div>

          <div className="ChatTypeDiv" id="CHATTYPE">
            <form
              onSubmit={(e) => e.preventDefault()}
              enctype="multipart/form-data"
            >
              <div className="Chat2-1">
                <span className="icon-align">
                  <label for="chatuploadImg">
                    <img src={imageIcon} className="chatImage" />
                  </label>
                  <input
                    type="file"
                    id="chatuploadImg"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleSendImage}
                    hidden
                  />
                  <p>
                    <img id="ChatImage" width="200" />
                  </p>
                </span>
                <span className="icon-align">
                  <label for="ctuploadVideo">
                    <img src={videoIcon} className="chatVideo" />
                  </label>
                  <input
                    type="file"
                    id="ctuploadVideo"
                    accept="video/mp4, audio/mp4"
                    onChange={handleSendVideo}
                    hidden
                  />

                  <p>
                    <video id="VIDEO" width="200" controls>
                      <source
                        id="videoOutput"
                        width="200"
                        type="video/mp4, audio/mp4"
                      />
                    </video>
                  </p>
                </span>
                <span className="icon-align">
                  <img
                    src={smileIcon}
                    className="chatSmile"
                    onClick={() => {
                      handleEmojis();
                    }}
                  />
                  {showEmoji ? (
                    <div className="chatemojipicker">
                      <Picker
                        width="300px"
                        height="420px"
                        theme="dark"
                        onEmojiClick={onemojiclick}
                      />
                    </div>
                  ) : null}
                </span>
                <input
                  className="ChatType2"
                  type="text"
                  value={textMsg}
                  placeholder="Type a message"
                  onChange={(e) => {
                    setTextMsg(e.target.value);
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? sendChatMsg(sendChatId) : ""
                  }
                  style={{ all: "unset" }}
                />

                <span className="icon-align">
                  <img
                    className="sendchaticon"
                    onClick={() => {
                      sendChatMsg(sendChatId);
                    }}
                    src={sendChatIcon}
                    alt="chat"
                  />
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="Chat1">
          <div className="ChatUserFlex">
            {sideChats.map((oneChat, index) => {
              return (
                <ChatUser
                  sidechat={oneChat}
                  indexx={index}
                  newMsgNotify={newChatMsg}
                />
              );
            })}
            {/* {(chats.map((sideChats, indexx)=>{
                   return <ChatUser name={sideChats.name} username={sideChats.user_name} index={indexx} displaypic={sideChats.displaypic} userNum={sideChats._id} />

                }))} */}
          </div>
          {/* {(viewChatList) ? (chatLists.length > 0 ? (chatLists.map((chat, index) => {
                      
                        return <ChatUser user={chat.users} msg={chat.latestmsg} indexx={index} viewChatid={chat._id} />
                    })) : null) : null}
                    {(viewChatList) ? (chatLists.length > 0 ? (chatLists.map((chat, index) => {
                        return <SearchChatUser user={chat.users} msg={chat.latestmsg} indexx={index} viewChatid={chat._id} />
                    })) : null) : null} */}
          {/* {isActive ? (
                        <div className="msgUser" id="ChatUser1" >
                            {/* {(list.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((list.displaypic.startsWith("https:")) ? (<img src={list.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${list.displaypic}`}  id="msgPicincircle" />))
                } 
                            <div className="ChatUser2">
                                <p className="msgName">{list.name}</p>
                                <p className="msgUsername">{list.user_name}</p>
                                 <p className="msgUsername">{props.msg}</p> 
                            </div>
                        </div>
                    ) : null} */}
        </div>
      </div>

      {loading == true ? <Loader loading={loading} /> : null}
      <NoChats />
      <div className="shareTweetDiv" id="SELECT_CHAT_BLOCK">
        <div className="shareePopup" id="shareBlock1">
          <p className="shareTweetText">Select a User</p>
          <hr className="shareTweetLine" id="msgLine" />
          <img
            src={deleteIcon}
            className="msgDelete"
            id="shareDlt"
            onClick={() => {
              document.getElementById("SELECT_CHAT_BLOCK").style.display =
                "none";
            }}
          />
        </div>
        <div className="shareTweetFlexbox">
          {sideChats.map((oneChat, index) => {
            return (
              <SearchChatUser
                sidechat={oneChat}
                indexx={index}
                newMsgNotify={newChatMsg}
              />
            );
          })}
        </div>
      </div>
      {/* <SearchChatUser /> */}
    </>
  );
}
export default Chats;
