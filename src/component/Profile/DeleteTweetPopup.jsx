import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FakeTweetDeleteAction, TweetDeleteAction } from "../../react-redux/actions/Tweets";

function DltTweetPopup() {
    const naavigate = useNavigate()
    const dispatch = useDispatch()
    const {deleteTweet, errorTweet, deleteSym} = useSelector((d)=>d.DeleteTweetsPReducer)
 
    var DltTwId =  sessionStorage.getItem("dlttweetId")
   
    function setOPacity (){
        var items= document.getElementsByClassName("POPUPBG")
        for(var i=0;i<items.length;i++){
            document.getElementsByClassName("POPUPBG")[i].style.opacity=1;
        }
    }
    function handleCancelLog() {
        document.getElementById("DltPopUp").style.display="none";
        setOPacity()
    }
   
    function handleLogOut() {
        document.getElementById("DltPopUp").style.display="none";
       setOPacity()
        dispatch(TweetDeleteAction(sessionStorage.getItem("dlttweetId")))
        dispatch(FakeTweetDeleteAction(sessionStorage.getItem("dlttweetId")))
        if(deleteTweet!=""){
            toast.success(`${deleteTweet}`, {
                position: "top-center",
                theme: "light",
                });
        }
        else if(errorTweet!=""){
            toast.error(`${errorTweet}`, {
                position: "top-center",
                theme: "light",
                });
        }
    }

    return <>
        <div id="DltPopUp">
            <div className="lOut1">
                <p className="logoutText1" id="DltPopText1">Delete tweet</p>
                <p className="logoutText2" id="DltPopText2">This can’t be undone and it will be permanently deleted from your profile</p>
                <button className="logoutbtn1" id="DltPopBtn1"  onClick={handleLogOut}>Delete</button>
                <button className="logoutbtn2" id="DltPopBtn2" onClick={handleCancelLog}>Cancel</button>
            </div>
        </div>
<ToastContainer />
    </>
}

export default DltTweetPopup;