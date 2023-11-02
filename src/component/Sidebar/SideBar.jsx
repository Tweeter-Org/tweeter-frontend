import React, { useEffect } from "react";
import { useState } from "react";
import "./Sidebar.css";
import menubar from "../Assets/menubar.svg"
import home from "../Assets/home.svg"
import notify from "../Assets/notifications.svg"
import bookmark from "../Assets/bookmarks.svg"
import message from "../Assets/comment.svg"
import profile from "../Assets/account_box.svg"
import searchIcon from "../Assets/search.svg"
import logoutIcon from "../Assets/logoutIcon.svg"
import greenhome from "../Assets/greenhome.svg"
import greennotify from "../Assets/greennotifications.svg"
import greenbm from "../Assets/greenbm.svg"
import greenmessage from "../Assets/greenmsg.svg"
import greenprofile from "../Assets/greenprofile.svg"
import SearchComp from "./SearchComp";
import { useDispatch, useSelector } from "react-redux";
import SearchUser, { BookmarksNav, Home, Messages, Notifications, Profile, SearchTweetWithTag } from "../../react-redux/actions/SearchApi";
import { Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
import AnchorLink from "react-anchor-link-smooth-scroll";
import CreateTweet from "../Home Page/createTweet";
import { Link } from "react-router-dom";
import LogOut from "../logOut/logOut";
import { ProfileApi } from "../../react-redux/actions/Profile";
import Tweetsearch from "./Tweetsearch";
import { InactiveUserList } from "../../react-redux/actions/Message";
import deleteIcon from "../Assets/delete.svg"
import ScrollableChat from "../Messages/ScrollableChats";
import NoChats from "../Messages/NoChats";
import { ViewNotifyAction } from "../../react-redux/actions/Notifications";

function Sidebar() {

    const auth = useSelector((s) => s.AuthReducer)
    const { user, toFgtPwd } = auth;
    const nameInApi = user?.user_name
    const { title, image, x } = useSelector((n) => n.TitleNavBar)

    function showTitle(x) {
        if (x == 0) {
            document.getElementById("homeIcon").src = greenhome
            document.getElementById("notify").src = notify;
            document.getElementById("bm").src = bookmark;
            document.getElementById("msg").src = message;
            document.getElementById("profileIcon").src = profile;
            document.getElementById("homeIcon2").src = greenhome
            document.getElementById("bm2").src = bookmark;
            document.getElementById("msg2").src = message;
            document.getElementById("profileIcon2").src = profile;
        }
        else if (x == 1) {
            document.getElementById("homeIcon").src = home;
            document.getElementById("notify").src = greennotify;
            document.getElementById("bm").src = bookmark;
            document.getElementById("msg").src = message;
            document.getElementById("profileIcon").src = profile;
            document.getElementById("homeIcon2").src = home;
            document.getElementById("bm2").src = bookmark;
            document.getElementById("msg2").src = message;
            document.getElementById("profileIcon2").src = profile;
        }
        else if (x == 2) {
            document.getElementById("homeIcon").src = home;
            document.getElementById("notify").src = notify;
            document.getElementById("bm").src = greenbm;
            document.getElementById("msg").src = message;
            document.getElementById("profileIcon").src = profile;
            document.getElementById("homeIcon2").src = home;
            document.getElementById("bm2").src = greenbm;
            document.getElementById("msg2").src = message;
            document.getElementById("profileIcon2").src = profile;
        }
        else if (x == 3) {
            document.getElementById("homeIcon").src = home;
            document.getElementById("notify").src = notify;
            document.getElementById("bm").src = bookmark;
            document.getElementById("msg").src = greenmessage;
            document.getElementById("profileIcon").src = profile;
            document.getElementById("homeIcon2").src = home;
            document.getElementById("bm2").src = bookmark;
            document.getElementById("msg2").src = greenmessage;
            document.getElementById("profileIcon2").src = profile;
        }
        else {
            document.getElementById("homeIcon").src = home;
            document.getElementById("notify").src = notify;
            document.getElementById("bm").src = bookmark;
            document.getElementById("msg").src = message;
            document.getElementById("profileIcon").src = greenprofile;
            document.getElementById("homeIcon2").src = home;
            document.getElementById("bm2").src = bookmark;
            document.getElementById("msg2").src = message;
            document.getElementById("profileIcon2").src = greenprofile
        }
        for (var i = 0; i < 5; i++) {
            if (i != x) {
                document.getElementsByClassName("sbListName")[i].style.color = "rgba(255, 255, 255, 0.9)";
            }
            else {
                document.getElementsByClassName("sbListName")[i].style.color = "#47c87a";
            }
        }
    }

    useEffect(() => {
        showTitle(x)
    }, [x])


    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { list, tomap, loading, tweetList, tohash } = useSelector((S) => S.SearchReducer)
    const [searchListArray, setSearchListArray] = useState([]);
    const [searchTweetList, setSearchTweetList] = useState([]);

    function handleSearch(e) {
        setSearch(e.target.value)
        if (e.target.value.startsWith('#')) {

            dispatch(SearchTweetWithTag(e.target.value.slice(1)))
        }
        dispatch(SearchUser(e.target.value));
        if (e.target.value !== "") {
            document.getElementById("HOME2").style.display = "none"
            document.getElementById("SIDESEARCH").style.display = "flex"
        }

        else {
            document.getElementById("HOME2").style.display = "flex"
            document.getElementById("SIDESEARCH").style.display = "none"
        }

    }
    
    useEffect(() => {
        if (tomap) {
            if (list.result.length > 0) {
                setSearchListArray(list.result)
            }
            else {
                setSearchListArray([])
            }
        }
    }, [tomap, list])
    useEffect(() => {
        if (tohash) {
            if (tweetList.length > 0) {
                setSearchTweetList(tweetList)
            }
            else {
                setSearchTweetList([])
            }
        }

    }, [tohash, tweetList])

    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])
    const navigate = useNavigate();
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.4;
        }
    }
    function xyz() {
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CTRETWEETDIV").style.display = "none";
        document.getElementById("CTweetText").style.display = "block";
        document.getElementById("buttonTweet").style.display = "block";
        document.getElementById("buttonRetweet").style.display = "none";
        document.getElementById("buttonReply").style.display = "none";
        document.getElementById("buttonReply2").style.display = "none";
        document.getElementById("CTReplyDiv").style.display = "none"
        setOPacity()
    }
    function handleLogout() {
        document.getElementsByClassName("logoutDiv")[0].style.display = "flex";
        setOPacity()
    }

    const pro = useSelector((p) => p.ProfileNameReducer)
    function handleProfile() {
        dispatch(Profile(greenprofile, "Profile", 4));

        // dispatch(ProfileApi(nameInApi))
    }

    const { chatLists, viewChatList, isActive } = useSelector((c) => c.MsgSearchReducer)
    function MsgSidebar() {
        dispatch(Messages(greenmessage, "Messages", 3))

        dispatch(InactiveUserList())
        if (chatLists.length > 0) {
            navigate("/chats/:userid")
        }
        else
            navigate("/messages")
    }
    function openSidebar() {
        document.getElementById("SIDEBAR").style.display = "block"
        // document.getElementById("SIDEBAR").style.transitionDelay="1s"
    }
    function closeSidebar() {
        document.getElementById("SIDEBAR").style.display = "none";
        // document.getElementById("SIDEBAR").style.transitionDelay="1s"
    }
    const [show, setShow] = useState(false)
function handleShowOption(){
setShow(!show)
if(show){
    document.getElementById("dropdown").style.display="block"
    setShow(false)
}
else{
    document.getElementById("dropdown").style.display="none"
    setShow(true)
}
}

    /* SIDEBAR NOTIFICATION MARK */
    const [notifBool, setNotifBool] = useState(false)
    const { notifyBool, viewNotifs} = useSelector((n) => n.NotificationReducer)
    useEffect(() => {
        dispatch(ViewNotifyAction())
    }, [])
    useEffect(()=>{
        if(notifyBool){
            if(viewNotifs.length>0)
            setNotifBool(true)
            else
            setNotifBool(false)
        }
       
    },[notifyBool])

   
    return <>
        <div>
            <div className="navbar POPUPBG">
                <p className="logoHeadNav">Tweeter</p>
                <div className="navbar1">
                    <img src={image} className="navbarIcon" />
                    <span><p className="navbarHead">{title}</p></span>
                </div>
            </div>
            <div className="navbar2">
            <img src={menubar} className="menubar" onClick={handleShowOption} />
            <div id="dropdown">
            <img src={notify} className="navNotify" onClick={()=>{
                dispatch(Notifications(greennotify, "Notifications", 1))
                navigate("/notification")
            }}/>
                <div className="navSearch1">
                    <img src={searchIcon}alt="search" className="navSearch2" onClick={() => {
                        navigate("/phonesearch")
                    }} />
                </div>
                <img src={logoutIcon} className="NV3Logout" onClick={handleLogout} />
            </div>
            </div>
            <div className="navbar3">
                <Link to="/"><img src={home} id="homeIcon2" className="NB3Home" onClick={() => { dispatch(Home(greenhome, "Home", 0)) }} /></Link>
                <Link to="/bookmark"> <img src={bookmark} id="bm2" className="NB3bm" onClick={() => { dispatch(BookmarksNav(greenbm, "Bookmark", 2)) }} /></Link>
                <img src={message} id="msg2" className="NB3Msg" onClick={() => { MsgSidebar() }} />
                <Link to={`/profile/${nameInApi}`}> <img src={profile} id="profileIcon2" className="NB3Profile" onClick={() => { handleProfile() }} /></Link>
               
            </div>
            <div className="sidebar POPUPBG" id="SIDEBAR">
                <p className="logoHead">Tweeter</p>
                <img src={deleteIcon} className="sbDeleteIcon" onClick={closeSidebar} />
                <ul className="sbList">
                    <Link to="/"><li className="sbListItem" onClick={() => { dispatch(Home(greenhome, "Home", 0)) }}><img src={home} className="sbListIcon" id="homeIcon" />
                        <span className="sbListName">
                            Home
                        </span>
                    </li></Link>
                    {notifBool?<span id="notifMark" />:null}
                    <Link to="/notification"><li className="sbListItem" onClick={() => { dispatch(Notifications(greennotify, "Notifications", 1)) }}>
                    <img src={notify} id="notify" className="sbListIcon" /><span className="sbListName">
                        Notifications  </span></li></Link>
                    <Link to="/bookmark"> <li className="sbListItem" onClick={() => { dispatch(BookmarksNav(greenbm, "Bookmark", 2)) }}><img className="sbListIcon" id="bm" src={bookmark} />   <span className="sbListName">Bookmarks  </span></li></Link>
                    <li className="sbListItem" onClick={() => { MsgSidebar() }}><img src={message} className="sbListIcon" id="msg" />   <span className="sbListName">Messages  </span></li>
                    {/* <li className="sbListItem" onClick={() => { dispatch(Messages(greenmessage, "Messages", 3)) }}><span className="sbListIcon"><img src={message} /></span>Messages</li> */}
                    <Link to={`/profile/${nameInApi}`}><li className="sbListItem" onClick={() => { handleProfile() }}><img className="sbListIcon" src={profile} id="profileIcon" />   <span className="sbListName">Profile  </span></li></Link>
                </ul>
                <button className="sideBarTweetBtn" onClick={() => { xyz() }}>Create Tweet</button>
                <button className="logOutBtn" onClick={handleLogout}><img src={logoutIcon} className="logoutIcon" />Log Out</button>
            </div>
            <div id="SEARCHBOX">
                <div className="searchBar">
                    <div className="searchBar_box">
                    <img src={searchIcon} className="searchIcon" alt="search" />
                    <input className="searchbar POPUPBG" type="text" value={search} onChange={handleSearch} placeholder="Search" />
                    </div>
                </div>
            
                <div className="searchFlexBox POPUPBG" id="SIDESEARCH">
                    {tohash ? (
                        searchTweetList.length > 0 ? (searchTweetList.map((se) => {
                            return <Tweetsearch hashtag={se.hashtag} tweetCount={se.tweet_cnt} />

                        })) : (<p className="searchAlter">No search found</p>)
                    ) : null}
                    {
                        tomap ? ((searchListArray.length > 0) ? (searchListArray.map((searchh) => {
                            return <SearchComp name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} />
                        })) : <p className="searchAlter">No search found</p>) : null
                    }
                </div>
            </div>

            <CreateTweet />
            <LogOut />

        </div>
        {(loading === true) ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
        <NoChats />
    </>
}
export default Sidebar

