import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MsgSearchUser from "../../react-redux/actions/Message";
import ShareTweetUser from "./ShareTweetUser";

function ShareTweet() {
    const [search, setSearch] = useState("")
    // const { toMsgUser, loading, msgUser } = useSelector((S) => S.MsgSearchReducer)
    const { chatLists, viewChatList, isActive, sendChatMessage, viewChatMsgs, loading } = useSelector((c) => c.MsgSearchReducer)
    // console.log(msgUser)
    // const [searchListArray, setSearchListArray] = useState([]);
    // const { user } = useSelector((a) => a.AuthReducer)

    const [info, setInfo] = useState([])
    
    // const [info2, setInfo2] = useState([])
    const dispatch = useDispatch();
    function handleSearch(e) {
        setSearch(e.target.value)
        dispatch(MsgSearchUser(e.target.value));
        console.log(MsgSearchUser)
    }
    // useEffect(() => {
    //     if (toMsgUser) {
    //         if (msgUser.length > 0) {

    //             setSearchListArray(msgUser)
    //         }
    //         else {
    //             setSearchListArray([])
    //         }
    //     }
    // }, [toMsgUser, msgUser])
    // useEffect(() => {
    //     if (msgUser.length > 0) {
    //         setInfo(msgUser)
    //         info.map((i, index) => {
    //             console.log(i._id)
    //             if (i._id === user._id) {
    //                 console.warn(index)
    //                 info.splice(index,1)
    //             }
    //         })
    //     }
    // }, [])
    console.log(info)

    return <>
        <div className="shareTweetDiv" id="SHAREBLOCK">
            <p className="shareTweetText">Share with</p>
            <hr className="shareTweetLine" />
            {/* <input className="shareTweetSearchIpt" type="text" value={search} onChange={handleSearch} placeholder="Search" /> */}
            <div className="shareTweetFlexbox">
            {(viewChatList) ? (chatLists.length > 0 ? (chatLists.map((chat, index) => {
                        {/* console.log(chat) */ }
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