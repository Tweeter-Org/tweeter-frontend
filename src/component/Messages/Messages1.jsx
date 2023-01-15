import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MsgSearchUser from '../../react-redux/actions/Message';
import SearchUser from '../../react-redux/actions/SearchApi';
import SearchComp from '../Sidebar/SearchComp';
import Sidebar from '../Sidebar/SideBar'
import "./Messages.css"
import MsgUser from './User';
const Messages1 = () => {
const [user, setUser] = useState("");
    const dispatch = useDispatch();
    const { toMsgUser, loading,msgUser } = useSelector((S) => S.MsgSearchReducer)
    console.log(msgUser)
    const [searchListArray, setSearchListArray] = useState([]);
    const [searchTweetList, setSearchTweetList] = useState([]);

    function handleSearch(e) {
        setUser(e.target.value)
        dispatch(MsgSearchUser(e.target.value));
    }
    useEffect(() => {
        if (toMsgUser) {
            if (msgUser.length > 0) {
                setSearchListArray(msgUser)
            }
            else {
                setSearchListArray([])
            }
        }
    }, [toMsgUser, msgUser])
    return <>
        <Sidebar />
        <div className='MSGS'>
            {/* <div className='Messages1'>
                <p className='MsgText1'>Welcome to your Inbox</p>
                <p className='MsgText2'>Wants to chat with someone or to share your thoughts, any tweets. Just message</p>
                <button className='MsgBtn1'>Write a new message</button>
            </div> */}
            <div className='Messages1'>
                <input className=" MsgSearch1 POPUPBG" type="text" value={user} onChange={handleSearch} placeholder="Search" />
                <div className="POPUPBG">
                {searchListArray.length > 0?( searchListArray.map((searchh) => {
                            return <MsgUser name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} />
                        })):null} 
                </div>
            </div>
            <span className='MsgLine1' />
        </div>

    </>
}

export default Messages1