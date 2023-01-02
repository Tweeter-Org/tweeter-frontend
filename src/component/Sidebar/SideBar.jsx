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
import SearchUser from "../../react-redux/actions/SearchApi";
import { Spinner } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
import AnchorLink from "react-anchor-link-smooth-scroll";
import CreateTweet from "../Home Page/createTweet";
import { Link } from "react-router-dom";
import LogOut from "../logOut/logOut";

function Sidebar (){
    // var title="Home";
    const [title, setTitle] = useState("Home")
    const [image, setImage] = useState(greenhome)
    function showTitle (n){
        document.getElementsByClassName("sbListItem")[n].style.color="#63DF76";
        document.getElementsByClassName("sbListItem")[n].style.textDecoration="underline";
        document.getElementsByClassName("sbListIcon")[n].style.color="#63DF76";
        for(var i=0;i<5;i++){
            if(i!=n)
            document.getElementsByClassName("sbListItem")[i].style.color="rgba(255, 255, 255, 0.9)";
            document.getElementsByClassName("sbListItem")[i].style.textDecoration="none";
            document.getElementsByClassName("sbListIcon")[i].style.color="rgba(255, 255, 255, 0.9)";
        }  
    }
    function handleTitle(n){
        switch(n){
            case 0: {
                return setTitle("Home"),
            setImage(greenhome)};
            case 1: {return setTitle("Notifications"), setImage(greennotify)};
            case 2: {return setTitle("Bookmarks"), setImage(greenbm)};
            case 3: {return setTitle("Messages"),  setImage(greenmessage)};
            case 4: {return setTitle("Profile"),  setImage(greenprofile)};
            default:{ return setTitle("Home"), setImage(greenhome)};
        }
    }

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const {list, tomap, loading} = useSelector((S)=>S.SearchReducer)
    const [searchListArray, setSearchListArray] = useState([]);
    function handleSearch(e){
        setSearch(e.target.value)
        dispatch(SearchUser(e.target.value));
        }
   
    useEffect(()=>{
        if(tomap){
            if(list.result.length>0){
            setSearchListArray(list.result)
            }
            else{
                setSearchListArray([])
            }
        }
       
    },[tomap, list])

    useEffect(()=>{
        if(loading===true){
            document.body.style.opacity = 0.5;
        }
        else{
            document.body.style.opacity = 1;
        }
    },[loading])
    const navigate = useNavigate();
    console.log(searchListArray)
  
function xyz(){
    document.getElementById("CREATETWEET").style.display="block"
    document.getElementsByClassName("poopupbg1")[0].style.opacity=0.1;
    document.getElementsByClassName("poopupbg2")[0].style.opacity=0.1;
    document.getElementsByClassName("poopupbg3")[0].style.opacity=0.1;
    document.getElementsByClassName("poopupbg4")[0].style.opacity = 0.1;
    document.getElementById("CREATETWEET").style.opacity=1;
}
function handleLogout(){
    document.getElementsByClassName("logoutDiv")[0].style.display="flex";
}
    return <>
    <div className="navbar poopupbg1">
        <img src={image} className="navbarIcon"/>
        <p className="navbarHead">{title}</p>
        <span id="navbarLine" />
    </div>
    <div className="sidebar poopupbg2">
        <p className="logoHead">Tweeter</p>
        <ul className="sbList">
        <Link to="/home"><li className="sbListItem" onClick={()=>{showTitle(0);handleTitle(0)}}><span className="sbListIcon"><img src={home} /></span>Home</li></Link>
        <li className="sbListItem" onClick={()=>{showTitle(1);handleTitle(1)}}><span className="sbListIcon"><img src={notify} /></span>Notifications</li>
        <Link to="/bookmark"> <li className="sbListItem" onClick={()=>{showTitle(2);handleTitle(2)}}><span className="sbListIcon"><img src={bookmark} /></span>Bookmarks</li></Link> 
            <li className="sbListItem" onClick={()=>{showTitle(3);handleTitle(3)}}><span className="sbListIcon"><img src={message} /></span>Messages</li>
           <Link to="/profile"><li className="sbListItem" onClick={()=>{showTitle(4);handleTitle(4)}}><span className="sbListIcon"><img src={profile} /></span>Profile</li></Link>
           </ul>
        {/* <AnchorLink href="#CREATETWEET"><button className="sideBarTweetBtn" >Create Tweet</button></AnchorLink> */}
        {/* <HashLink to="#CREATETWEET"><button className="sideBarTweetBtn" onClick={()=>{document.getElementById("CREATETWEET").style.display="block"}}>Create Tweet</button></HashLink> */}
        <button className="sideBarTweetBtn" onClick={()=>{xyz()}}>Create Tweet</button>
    </div>
    <div><input className="searchbar" type="text" value={search} onChange={handleSearch} placeholder="Search" />
    <p className="logout" onClick={handleLogout}>Log Out</p> </div>
    <div className="searchFlexBox poopupbg4">
         {(searchListArray.length>0)?(searchListArray.map((searchh)=>{
            return <SearchComp name={searchh.name} username={searchh.user_name} />
        })):<p className="searchAlter">No search found</p>}
    </div>
    <CreateTweet />
    <LogOut />
    {(loading===true)?<Spinner animation="border" variant="light" id="loadSpinner" />:null}
    </>
}
export default Sidebar