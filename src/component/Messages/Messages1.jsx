import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MsgSearchUser from '../../react-redux/actions/Message';
import SearchUser from '../../react-redux/actions/SearchApi';
import SearchComp from '../Sidebar/SearchComp';
import Sidebar from '../Sidebar/SideBar'
import "./Messages.css"
import deleteIcon from "../Assets/delete.svg"
import chatImage from "../Assets/chatImage.svg"
import MsgDropdown from './MsgDropDown';
import MsgUser from './User';
const Messages1 = () => {

    function handleMsgDD() {
        document.getElementById("MSGDROPDOWN").style.display = "flex";
    }

    return <>
        <Sidebar />
        <div className='MSGS  POPUPBG'>
            <div className='Messages1'>
                <p className='MsgText1'>Welcome to your Inbox</p>
                <p className='MsgText2'>Wants to chat with someone or to share your thoughts, any tweets. Just message</p>
                <button className='MsgBtn1' onClick={handleMsgDD} >Write a new message</button>
            </div>
            <img src={chatImage} className="messageImage" />
        </div>
        <MsgDropdown />
        {/* <span className='MsgLine1' /> */}
    </>
}

export default Messages1