import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MsgSearchUser from "../../react-redux/actions/Message";
import ShareTweetUser from "./ShareTweetUser";

function ShareTweet (){
    const [search, setSearch] = useState("")
    const { toMsgUser, loading,msgUser } = useSelector((S) => S.MsgSearchReducer)
    console.log(msgUser)
    const [searchListArray, setSearchListArray] = useState([]);
    const {user} = useSelector((a)=>a.AuthReducer)
    const [info, setInfo] = useState([])
const dispatch = useDispatch();
    function handleSearch(e) {
        setSearch(e.target.value)
        dispatch(MsgSearchUser(e.target.value));
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
      useEffect(()=>{
        if(msgUser.length>0){
            msgUser.map((u)=>{
                console.log(u._id)
                if(u._id != user._id)
                {
                    console.log(u)
                    setInfo([...info, u])
                    return u
                }
            })
        }
    },[toMsgUser, msgUser])
    console.log(info)

    return <>
        <div className="shareTweetDiv" id="SHAREBLOCK">
        <p className="shareTweetText">Share with</p>
        <input className="shareTweetSearchIpt" type="text" value={search} onChange={handleSearch} placeholder="Search" />
        <div className="shareTweetFlexbox">
        {info.length > 0?( info.map((searchh) => {
                            return <ShareTweetUser name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} userNum= {searchh._id} />
                        })):null} 
        </div>
        </div>
    </>
}

export default ShareTweet;