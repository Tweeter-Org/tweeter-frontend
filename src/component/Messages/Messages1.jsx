import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MsgSearchUser from '../../react-redux/actions/Message';
import SearchUser from '../../react-redux/actions/SearchApi';
import SearchComp from '../Sidebar/SearchComp';
import Sidebar from '../Sidebar/SideBar'
import "./Messages.css"
import MsgDropdown from './MsgDropDown';
import MsgUser from './User';
const Messages1 = () => {

    function handleMsgDD(){
        document.getElementById("MSGDROPDOWN").style.display="flex";
    }

    return <>
        <Sidebar />
        <div className='MSGS'>
            <div className='Messages1'>
                <p className='MsgText1'>Welcome to your Inbox</p>
                <p className='MsgText2'>Wants to chat with someone or to share your thoughts, any tweets. Just message</p>
                <button className='MsgBtn1' onClick={handleMsgDD} >Write a new message</button>
            </div>
            {/* <div className='Messages2'>
            <p className='MsgText2-1'>Start a new Conversation</p>
                <p className='MsgText2-2'>Wants to chat with someone or to share your thoughts, any tweets. Just message</p>
                <button className='MsgBtn2-1'>Write a new message</button>
            </div> */}
        </div>
        <MsgDropdown />
        {/* <span className='MsgLine1' /> */}
    </>
}

export default Messages1