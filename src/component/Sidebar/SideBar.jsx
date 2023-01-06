import React, { useEffect } from "react";
import { useState } from "react";
import "./Sidebar.css";
import home from "../Assets/home.svg"
import notify from "../Assets/notifications.svg"
import bookmark from "../Assets/bookmarks.svg"
import message from "../Assets/comment.svg"
import profile from "../Assets/account_box.svg"
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

function Sidebar() {

    const auth = useSelector((s) => s.AuthReducer)
    const { user, toFgtPwd } = auth;
    const nameInApi = user.user_name
    const { title, image, x } = useSelector((n) => n.TitleNavBar)
    function showTitle(x) {
        // document.getElementsByClassName("sbListItem")[x].style.color = "#63DF76";
        // document.getElementsByClassName("sbListItem")[x].style.textDecoration = "underline";
        for (var i = 0; i < 5; i++) {
            if (i != x)
                document.getElementsByClassName("sbListItem")[i].style.color = "rgba(255, 255, 255, 0.9)";
            document.getElementsByClassName("sbListItem")[i].style.textDecoration = "none";

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
            dispatch(SearchTweetWithTag(e.target.value))
            console.log("hash tweet")
            console.log(e.target.value)
        }
            dispatch(SearchUser(e.target.value));
        // dispatch(SearchTweetWithTag(e.target.value))
        
    }
    console.log(tweetList, tohash)
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
    console.log(searchListArray)

    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 0.2;
        }
    }
    function xyz() {
        document.getElementById("CREATETWEET").style.display = "block"
        document.getElementById("CTRETWEETDIV").style.display="none";
        document.getElementById("buttonTweet").style.display="block";
        document.getElementById("buttonRetweet").style.display="none";
        setOPacity()
    }
    function handleLogout() {
        document.getElementsByClassName("logoutDiv")[0].style.display = "flex";
        setOPacity()
    }

    const pro = useSelector((p) => p.ProfileNameReducer)
    function handleProfile() {
        dispatch(Profile(greenprofile, "Profile", 4));
        dispatch(ProfileApi(nameInApi))
        navigate(`/profile?name=${pro.name}`)
        console.log(`/profile?name=${pro.name}`)
    }
    return <>
        <div>
            <div className="navbar POPUPBG">
                <img src={image} className="navbarIcon" />
                <p className="navbarHead">{title}</p>
                <span id="navbarLine" />
            </div>
            <div className="sidebar POPUPBG">
                <p className="logoHead">Tweeter</p>
                <ul className="sbList">
                    <Link to="/home"><li className="sbListItem" onClick={() => { dispatch(Home(greenhome, "Home", 0)) }}><span className="sbListIcon"><img src={home} /></span>Home</li></Link>
                    <li className="sbListItem" onClick={() => { dispatch(Notifications(greennotify, "Notifications", 1)) }}><span className="sbListIcon"><img src={notify} /></span>Notifications</li>
                    <Link to="/bookmark"> <li className="sbListItem" onClick={() => { dispatch(BookmarksNav(greenbm, "Bookmark", 2)) }}><span className="sbListIcon"><img src={bookmark} /></span>Bookmarks</li></Link>
                    <li className="sbListItem" onClick={() => { dispatch(Messages(greenmessage, "Messages", 3)) }}><span className="sbListIcon"><img src={message} /></span>Messages</li>
                    <Link to="/profile"><li className="sbListItem" onClick={handleProfile}><span className="sbListIcon"><img src={profile} /></span>Profile</li></Link>
                </ul>
                {/* <AnchorLink href="#CREATETWEET"><button className="sideBarTweetBtn" >Create Tweet</button></AnchorLink> */}
                {/* <HashLink to="#CREATETWEET"><button className="sideBarTweetBtn" onClick={()=>{document.getElementById("CREATETWEET").style.display="block"}}>Create Tweet</button></HashLink> */}
                <button className="sideBarTweetBtn" onClick={() => { xyz() }}>Create Tweet</button>
            </div>
            <div><input className="searchbar POPUPBG" type="text" value={search} onChange={handleSearch} placeholder="Search" />
                <p className="logout POPUPBG" onClick={handleLogout}>Log Out</p> </div>
            <div className="searchFlexBox POPUPBG">
                {tohash ? (
                    searchTweetList.length > 0 ? (searchTweetList.map((se) => {
                        return <Tweetsearch hashtag={se.hashtag} />

                    })) : (<p className="searchAlter">No search found</p>)
                ) : null}
                {
                    tomap ? ((searchListArray.length > 0) ? (searchListArray.map((searchh) => {
                        return <SearchComp name={searchh.name} username={searchh.user_name} />
                    })) : <p className="searchAlter">No search found</p>) : null
                }
            </div>
            <CreateTweet/>
            <LogOut />
        </div>
        {(loading === true) ? <Spinner animation="border" variant="light" id="loadSpinner" /> : null}
    </>
}
export default Sidebar