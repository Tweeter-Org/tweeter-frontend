import React, { useState, useEffect } from "react";
import imageIcon from "../Assets/imageIcon.svg";
import videoIcon from "../Assets/videoIcon.svg";
import smileIcon from "../Assets/smileIcon.svg";
import { useNavigate } from "react-router";
import "./homepage.css"
import Picker from "emoji-picker-react"
import { CreateReTweetAct, CreateTweetAct, FakeReTweetFeedAction, FakeTweetFeedAction } from "../../react-redux/actions/Tweets.jsx";
import { useDispatch } from "react-redux";
import FormData from "form-data";
import { useSelector } from "react-redux";
import ToasterSuccess from "../Assets/ToasterSuccess";
import Loader from "../Assets/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from "../Assets/avatar.svg";
import { FakeReplyTweetAction, ReplyToTweet } from "../../react-redux/actions/Replies";
import SearchUser, { SearchTweetWithTag } from "../../react-redux/actions/SearchApi";
import CreateSearch from "./CreateSearch";
import CTSearchTag from "./SearchTag";

function CreateTweet(props) {
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [sendImage, setSendImage] = useState(null);
    const [imageInArr, setImageInArr] = useState(null)
    const [vdoInArr, setVdoInArr] = useState(null)
    const dispatch = useDispatch();
    const fd = new FormData();
    function handleSendImage(e) {
        document.getElementById("imageOutput").style.display = "block"
        var imageoutput = document.getElementById("imageOutput");
        imageoutput.src = URL.createObjectURL(e.target.files[0])
        setImageInArr(URL.createObjectURL(e.target.files[0]))
        setSendImage(e.target.files[0])

    }
    const [sendVideo, setSendVideo] = useState(null);
    function handleSendVideo(e) {
        var videooutput = document.getElementById("videoOutput");
        videooutput.src = URL.createObjectURL(e.target.files[0])
        setVdoInArr(URL.createObjectURL(e.target.files[0]))
        // console.log(URL.createObjectURL(e.target.files[0]))
        setSendVideo(e.target.files[0])
        document.getElementById("VIDEO").style.display = "block"
        document.getElementById("videoOutput").style.display = "block"
    }

    function handleEmojis() {
        setShowEmoji(!showEmoji)
    }

    function onemojiclick(emojiObject, event) {
        setText(prevText => prevText + emojiObject.emoji)
        setShowEmoji(false)
    }

    function setOPacity() { /*SET BACKGROUND OPACITY*/
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 1;
        }
    }

    function backToHome(e) {
        setOPacity()
        e.preventDefault();
        setText("")
        document.getElementById("CREATETWEET").style.display = "none"
        setSendImage(null);
        setSendVideo(null)
        setImageInArr(null)
        setVdoInArr(null)
        document.getElementById("VIDEO").style.display = "none"
        document.getElementById("videoOutput").style.display = "none"
        document.getElementById("imageOutput").style.display = "none"
        setShowEmoji(false)
        // document.getElementById("imageOutput").style.display = "none"
        // document.getElementById("videoOutput").style.display = "none"
        // document.getElementById("VIDEO").style.display = "none"

    }
    const TWEETREDUCER = useSelector((t) => t.TweetCreateReducer)
    const { response, error, tweetCreate, toastBoolR, toastBoolE, loading } = TWEETREDUCER;
    const [toastErr, setToastErr] = useState(false)
    const [toastRes, setToastRes] = useState(false)
    const [toastBool, setToastBool] = useState(false)
   
    const auth = useSelector((s) => s.AuthReducer)
    const { user, toFgtPwd } = auth;
    const { name, user_name, displaypic } = user;
    const [DupTweetData, setDupTweetData] = useState([])
    const { tweetData, liked, Rname, Rimage, Rvideo, Rtext } = useSelector((s) => s.TweetFeedReducer)
    const RId = sessionStorage.getItem("retweetId")
    useEffect(() => {
        setDupTweetData(tweetData)
        DupTweetData.filter((t) => {
            if (t._id == props.TWRId) {
                // console.log(t)
            }
            return t._id == props.TWRId
        })
    }, [props.TWRId])
    const newTweetCreated = {
        "image": imageInArr,
        "likes": "0",
        "text": text,
        "video": vdoInArr,
        user: {
            "name": name,
            "user_name": user_name,
            displaypic: displaypic
        }
    }
    const newReTweetCreated = {
        "image": imageInArr,
        "likes": "0",
        "text": text,
        "video": vdoInArr,
        user: {
            "name": name,
            "user_name": user_name,
            displaypic: displaypic
        },
        retweet: {
            "image": Rimage,
            "video": Rvideo,
            "text": Rtext,
            "_id": RId,
            user: {
                "name":Rname,
                "user_name": Rname,
                displaypic: displaypic
            },
        }
    }
    /*TAGS AND @ SEARCH */
    const { list, tomap, tweetList, tohash } = useSelector((S) => S.SearchReducer)
    const [searchListArray, setSearchListArray] = useState([]);
    const [searchTweetList, setSearchTweetList] = useState([]);
    const [hash, setHash] = useState(false)
    const [mention, setMention] = useState(false)

    function handleCreateTweetSearch(e) {
        setText(e.target.value)
        dispatch(SearchUser(e.target.value));
        setMention(true)
        if (e.target.value.startsWith('#')) {
        
            setHash(true)
            setMention(false)
            dispatch(SearchTweetWithTag(e.target.value.slice(1)))
        }
        if (e.target.value.includes('@')) {
            setMention(true)
            // console.log(e.target.value.slice(1))
            setHash(false)
            dispatch(SearchUser(e.target.value.slice(1)));
        }
        if(e.target.value==""){
            setHash(false)
            setMention(false)
        }
        // setSearchListArray([])
       
        // setSearchTweetList([])
        // if (tomap) {
        //     if (list.result.length > 0) {
        //         setSearchListArray(list.result)
        //     }
        //     else {
        //         setSearchListArray([])
        //     }
        // }
        // if (tohash) {

        // document.getElementById("ctSearchHash").style.display="block";
        // document.getElementById("ctSearchATR").style.display="none";
        //     if (tweetList.length > 0) {
        //         setSearchTweetList(tweetList)
        //     }
        //     else {
        //         setSearchTweetList([])
        //     }
        // }
        // if(!e.target.value){
        //     setSearchListArray([])
        //     setSearchTweetList([])
        // }
    }
    // console.log(list)
    // console.log(tweetList)
    // const [tag, setTag] = useState(false)
    // useEffect(() => {
    //     if (tomap) {
    //         if (list.result.length > 0) {
    //             setSearchListArray(list.result)
    //         }
    //         else {
    //             setSearchListArray([])
    //         }
    //     }
    // if(!text){
    //     setSearchListArray([])
    //     setSearchTweetList([])
    // }
    // }, [tomap, list, text])
    // useEffect(() => {
    //     if (tohash) {
    //         if (tweetList.length > 0) {
    //             setSearchTweetList(tweetList)
    //         }
    //         else {
    //             setSearchTweetList([])
    //         }
    //     }
    //     if(!text){
    //         setSearchListArray([])
    //        setSearchTweetList([])
    //     }
    // }, [tohash, tweetList, text])
    // useEffect(()=>{
    //     if(searchListArray.length==0 && searchTweetList.length==0)
    //     document.getElementById("CTSEARCH").style.display="none";
    //     else
    //     document.getElementById("CTSEARCH").style.display="flex";
    // },[searchListArray, searchTweetList])

    useEffect(()=>{
        if(!text){
            document.getElementById("textRequired").style.display="flex";
        }
            else{
                document.getElementById("textRequired").style.display="none";
            }    
    },[text])

    function handleCreateTweet(e) {
        e.preventDefault();
        fd.append("text", text)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        if(text!=""){
            dispatch(CreateTweetAct(fd))
            dispatch(FakeTweetFeedAction(newTweetCreated))
            backToHome(e)
        }
       
setText("")
        setSendImage(null);
        setSendVideo(null)
        setImageInArr(null)
        setVdoInArr(null)
        setShowEmoji(false)

    }

    // console.log(RId)
    function handleCreateReTweet(e) {
        e.preventDefault();
        fd.append("text", text)
        fd.append("tweetId", RId)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        if(text!=""){
            dispatch(CreateReTweetAct(fd))
            // console.log(newReTweetCreated)
            backToHome(e)
            dispatch(FakeReTweetFeedAction(newReTweetCreated))
        }
        setText("")
        setSendImage(null);
        setSendVideo(null)
        setImageInArr(null)
        setVdoInArr(null)
       setShowEmoji(false)
    }
    const { responseT, errorT, nameInReply, showName } = useSelector((r) => r.ReplyReducer)
    const atNames = sessionStorage.getItem("replyName");

    const replYtweet = {
        "image": imageInArr,
        "likes": "0",
        "text": text,
        "video": vdoInArr,
        user: {
            "user_name": user_name,
            "displaypic": displaypic
        },
        "replyingto": nameInReply
    }
    function handleTweetReply(e) {
        fd.append("text", text)
        fd.append("tweetId", RId)
        // console.warn(RId)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        dispatch(ReplyToTweet(fd))
        // console.
        dispatch(FakeReplyTweetAction(replYtweet))
        backToHome(e)
        // console.log(replYtweet)
    }
    function handleReplyReply(e) {
        fd.append("text", text)
        fd.append("tweetId", RId)
        // console.warn(RId)
        if (sendImage != "") {
            fd.append("file", sendImage)
        }
        else if (sendVideo != "") {
            fd.append("file", sendVideo)
        }
        else {
            fd.append("file", null)
        }
        dispatch(ReplyToTweet(fd))
        document.getElementById("EMOJI").style.display = "none"
        // console.
        // dispatch(FakeReplyTweetAction(replYtweet))
        backToHome(e)
        // console.log(replYtweet)
    }

    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])
    const navigate = useNavigate();

    return <>
        <div className="createTweetDiv" id="CREATETWEET">
            <div className="CTBlock1">
                {(displaypic === null) ? (<img src={avatar} id="ctCircle" />) :
                    (<img src={displaypic} id="ctCircle" />)}


                <div className="CTDiv1">
                    <p className="ctName">{name}</p>
                    <p className="ctUserName">@{user_name}</p>
                </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}
                enctype="multipart/form-data" >
                <div id="CTweetText">
                    <p className="ctTagline">Share tweets with your followers</p>
                    <div className="ctWriteTweet">
                        <input type="text" list="tagsInputList" className="ctWriteTweetInput" value={text} onChange={handleCreateTweetSearch} required />
                        <datalist id="tagsiInputList">
                        {/* {console.log(mention)} */}
                            {hash ?(
                                searchTweetList.length > 0 ? (searchTweetList.map((se) => {
                                    return <option value={se.hashtag}>{se.hashtag}</option>

                                })):null) : (mention ?(searchListArray.length > 0 ? (searchListArray.map((searchh) => {
                                    return <option value={searchh.user_name}>{searchh.user_name}</option>
                                })):null):null)}
                            {/* {
                                tomap ? ((searchListArray.length > 0) ? (searchListArray.map((searchh) => {
                                    return <option value={searchh.user_name}>{searchh.user_name}</option>
                                })) : null) : null
                            } */}
                        </datalist>
                       
                    </div>
                    <p id="textRequired">Text is required</p>
                    {/* <div className="ctSearchFlexBox POPUPBG" id="CTSEARCH">
                {tohash ? (
                    searchTweetList.length > 0 ? (searchTweetList.map((se) => {
                        return <CTSearchTag hashtag={se.hashtag} />

                    })) : (null)
                ) : null}
                {
                    tomap ? ((searchListArray.length > 0) ? (searchListArray.map((searchh) => {
                        return <CreateSearch username={searchh.user_name}  />
                    })) :null) : null
                }
            </div> */}
                </div>
                <div className="CTRetweetDiv" id="CTRETWEETDIV">
                    <div className="CTRet1">
                        <img src={avatar} id="CTRetweetImage" />
                        <div className="CTRet2">
                            <p id="CTRetweetName" className="ctName">{Rname}</p>
                            {/* <p id="CTRetweetUsernname" className="ctUserName">{user_name}</p> */}
                        </div>
                    </div>
                    {/* {Rimage != null ? (<p className="TWRImageText" >Tweets's Image -: &ensp;<a id="TWRImageLink" href={Rimage} target="_blank">{Rimage}</a></p>) : null} */}
                    {/* {Rvideo != null ? (<p className="TWRImageText" >Tweets's Video -: &ensp;<a id="TWRImageLink" href={Rvideo} target="_blank">{Rvideo}</a></p>) : null} */}
                    {Rimage != null ? (<img src={Rimage} className="CTRVideo" alt="image" />) : null}
                    {Rvideo != null ? <video controls className="CTRVideo">
                        <source src={Rvideo} type="video/mp4" />
                    </video> : null}
                    <p className="TWRText" >{Rtext}</p>
                </div>
                <div id="CTReplyDiv">
                    <p className="ctName">Replying to <span id="CTReplyAtName">@{Rname}</span></p>
                    <div className="CTReplyTweet">
                        <input type="text" id="CTReplyInput" className="ctWriteTweetInput" value={text} onChange={(e) => { setText(e.target.value) }} />
                    </div>
                </div>
                {/* <p><img id="imageOutput" /></p>
                <p><video id="VIDEO" width="200" controls>
                            <source id="videoOutput" width="200" type="video/mp4, audio/mp4" />
                        </video>
                        </p> */}
                <div className="CTBlock2">
                    <div className="CTUPLIMG">
                        <label for="ctuploadImg"><img src={imageIcon} className="ctImage" /></label>
                        <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
                        <p className="ctImageText">Image</p>
                      
                    </div>
                    <div>
                        <label for="ctuploadVideo"><img src={videoIcon} className="ctVideo" /></label>
                        <input type="file" id="ctuploadVideo" accept="video/mp4, audio/mp4" onChange={handleSendVideo} hidden />
                        <p className="ctVideoText">Video</p>
                    </div>
                    <div>
                        <img src={smileIcon} className="ctSmile" onClick={() => { handleEmojis() }} />
               {showEmoji ? (<div className="emojipicker1"><Picker className="emojipicker2" id="EMOJI" theme="dark" width="18vw" height="250px" onEmojiClick={onemojiclick} /></div>) : null}
               <p className="ctSmileText">Emojis</p>
                      
                    </div>
                    <button className="ctCancelTweet" onClick={backToHome}>Cancel</button>
                    <button className="ctCreateTweet" onClick={handleCreateTweet} id="buttonTweet" >Tweet</button>
                    <button className="ctCreateTweet" id="buttonRetweet" onClick={handleCreateReTweet}>ReTweet</button>
                    <button className="ctCreateTweet" id="buttonReply" onClick={handleTweetReply}>Reply</button>
                    <button className="ctCreateTweet" id="buttonReply2" onClick={handleReplyReply}>Reply</button>
                </div>
            </form>
        </div>

        {loading === true ? <Loader loading={loading} /> : null}
        <ToastContainer />
    </>
}
export default CreateTweet