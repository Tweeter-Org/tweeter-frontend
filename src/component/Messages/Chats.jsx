import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewChatList } from "../../react-redux/actions/Message";
import Sidebar from "../Sidebar/SideBar";
import ChatUser from "./ChatUser";
import MsgUser from "./User";
import avatar from "../Assets/avatar.svg"
import { useParams } from "react-router-dom";

function Chats() {
    const [userN, setUserN] = useState("")
    const [userlist, setUesrlist] = useState([])
    const dispatch = useDispatch();
    function handleSearch(e) {
        setUserN(e.target.value)
    }
    const { chatLists, viewChatList, isActive } = useSelector((c) => c.MsgSearchReducer)
    console.log(chatLists)
    // console.log(isActive)
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
    console.log(useParams())
    const { userid } = useParams();
    useEffect(() => {
        if (isActive) {
            chatLists.map((ch) => {
                // console.log(ch);
                // console.warn(ch.users)
                ch.users.map((c) => {
                    if (c.user_name != user.user_name)
                        // console.warn(c)
                    if (c._id == userid) {
                        // console.log(c)
                        setlist(c)
                        // console.log(list.name)
                    }

                })
            })
        }
    }, [isActive, userid])

    return <>
        <Sidebar />
        <div className='CHATS'>
            <div className="Chat2">
                <div className="ChatInfo2">
                    <img src={avatar} id="msgPicincircle" />
                    {/* {(props.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="msgPicincircle" />))
                } */}
                    <p className="msgName" id="ChatName">{list.name}</p>
                </div>
                <div className="ChatType2"></div>
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