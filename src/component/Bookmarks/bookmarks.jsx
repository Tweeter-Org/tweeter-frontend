import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeeBookmarkAction } from "../../react-redux/actions/Bookmarks.jsx";
import Sidebar from "../Sidebar/SideBar";
import { Spinner } from 'react-bootstrap';
import Tweet from "../Home Page/TweetComp";
import BMAlter from "../Assets/noBookmarks.svg"
import "./bookmarks.css"
import { useNavigate } from "react-router-dom";

function Bookmarks (){
    const dispatch = useDispatch();
    const tweets= useSelector((b)=>b.BookmarkReducer)
const { bookmarkedTweet, markBM, loading} = tweets
const navigate = useNavigate();
console.log( bookmarkedTweet)
const BMLength = bookmarkedTweet.length;
console.log(tweets)
    useEffect(()=>{
        dispatch(SeeBookmarkAction())

    },[])
   
    const [load, setLoad] = useState(loading)
     useEffect(()=>{
        if(BMLength>0)
        setLoad(false)
    },[BMLength])

    // useEffect(()=>{
    //     if(load===true){
    //         document.body.style.opacity = 0.5;
    //     }
    //     else{
    //         document.body.style.opacity = 1;
    //     }
    // },[load])
    function handleToHome (){
        navigate("/home")
    }
    
    return <>
    <Sidebar />
    <div className="tweetFlexBox poopupbg3">
    {BMLength>0? (bookmarkedTweet.map((bm, index)=>{
        return <Tweet text={bm.text} image={bm.image} video={bm.video} username={bm.user.user_name} displaypic={bm.user.displaypic} tweetId={bm._id} number={index} bookmarkb="true" />;

    })):<div className="alterBM"><img src={BMAlter} className="alterBMImage"/>
    <p className="alterBMText1">No Tweets Bookmarked yet</p>
    <p className="alterBMText2" onClick={()=>{handleToHome()}}>Save tweets for later</p></div>}
    </div>
    {/* {(load===true)?<Spinner animation="border" variant="light" id="loadSpinner" />:null} */}
    </>
}
export default Bookmarks