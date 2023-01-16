import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewChatList } from "../../react-redux/actions/Message";
import Sidebar from "../Sidebar/SideBar";
import ChatUser from "./ChatUser";
import MsgUser from "./User";

function Chats() {
    const [user, setUser] = useState("")
    const [userlist, setUesrlist] = useState([])
    const dispatch = useDispatch();
    function handleSearch(e) {
        setUser(e.target.value)
    }
    const { chatLists, viewChatList } = useSelector((c) => c.MsgSearchReducer)
    console.log(chatLists)
    useEffect(() => {
        dispatch(ViewChatList())
        setUesrlist(chatLists[0].users)
        console.log(viewChatList)
    }, [])
    // console.log(chatLists[0].users)
    useEffect(() => {
        document.getElementById("SEARCHBOX").style.display = "none";
    }, [])

    return <>
        <Sidebar />
        <div className='CHATS'>
        <div className="Chat2">
                
            </div>
            <div className='Chat1'>
                <input className=" ChatSearch1 POPUPBG" type="text" value={user} onChange={handleSearch} placeholder="Search" />
                <div className="ChatUserFlex">
                    {userlist.length > 0 ? (userlist.map((chat) => {
                        return <ChatUser name={chat.name} username={chat.user_name} displaypic={chat.displaypic} />
                    })) : null}
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