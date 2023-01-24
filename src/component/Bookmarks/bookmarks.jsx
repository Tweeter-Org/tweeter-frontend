import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeeBookmarkAction } from "../../react-redux/actions/Bookmarks.jsx";
import Sidebar from "../Sidebar/SideBar";
import { Spinner } from 'react-bootstrap';
import Tweet from "../Home Page/TweetComp";
import BMAlter from "../Assets/noBookmarks.svg"
import "./bookmarks.css"
import { useNavigate } from "react-router-dom";
import Loader from "../Assets/Loader.jsx";

function Bookmarks (){
    const dispatch = useDispatch();
    const tweets= useSelector((b)=>b.BookmarkReducer)
    const [bookmarkArray, setBookmarkArray] = useState([])
const { bookmarkedTweet, markBM, loading} = tweets
const navigate = useNavigate();
console.log( bookmarkedTweet)
var BMLength ;
console.log(tweets)
    useEffect(()=>{
        dispatch(SeeBookmarkAction())
    },[])
   useEffect(()=>{
    if(markBM){
        if(bookmarkedTweet.length>0)
        setBookmarkArray(bookmarkedTweet)
        BMLength = bookmarkedTweet.length;
    }
    else{
        setBookmarkArray([])
    }
   },[markBM, bookmarkedTweet])
   console.log(BMLength)
    function handleToHome (){
        navigate("/")
    }
    useEffect(()=>{
        if(loading===true){
            document.body.style.opacity = 0.5;
        }
        else{
            document.body.style.opacity = 1;
        }
    },[loading])
    return <>
    <Sidebar />
    <div className="tweetFlexBox POPUPBG" id="BOOKMARK">
    {bookmarkArray.length>0? (bookmarkArray.map((bm, index)=>{
        return <Tweet text={bm.text} image={bm.image} replies={bm.replyingto} retweet={bm.retweet} 
         likeCount={parseInt(bm.likes)} video={bm.video} username={bm.user.user_name} name={bm.user.name}
          displaypic={bm.user.displaypic} tweetId={bm._id} number={index} bookmarked="true" />;

    })):<div className="alterBM"><img src={BMAlter} className="alterBMImage"/>
    <p className="alterBMText1">No Tweets Bookmarked yet</p>
    <p className="alterBMText2" onClick={()=>{handleToHome()}}>Save tweets for later</p></div>}
    </div>
    {(loading===true)?<Loader loading={loading}/>:null}
    </>
}
export default Bookmarks