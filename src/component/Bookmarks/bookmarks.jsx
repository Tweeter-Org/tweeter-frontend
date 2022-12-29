import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeeBookmarkAction } from "../../react-redux/actions/bookmarkAction";
import Sidebar from "../Sidebar/SideBar";
import { Spinner } from 'react-bootstrap';
import Tweet from "../Home Page/TweetComp";
import BMAlter from "../Assets/noBookmarks.svg"
import "./bookmarks.css"

function Bookmarks (){
    const dispatch = useDispatch();
    const tweets= useSelector((b)=>b.BookmarkReducer)
const { bookmarkedTweet, markBM, loading} = tweets
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
    
    return <>
    <Sidebar />
    <div className="tweetFlexBox poopupbg3">
    {BMLength>0? (bookmarkedTweet.map((bm, index)=>{
        return <Tweet text={bm.text} image={bm.image} video={bm.video} username={bm.user.user_name} displaypic={bm.user.displaypic} tweetId={bm._id} number={index} bookmarkb="true" />;

    })):<div className="alterBM"><img src={BMAlter} className="alterBMImage"/></div>}
    </div>
    {/* {(load===true)?<Spinner animation="border" variant="light" id="loadSpinner" />:null} */}
    </>
}
export default Bookmarks