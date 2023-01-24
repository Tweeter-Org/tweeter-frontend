import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MsgSearchUser from "../../react-redux/actions/Message";
import MsgUser from "./User";
import deleteIcon from "../Assets/delete.svg"

function MsgDropdown() {
    const [user, setUser] = useState("");
    const dispatch = useDispatch();
    const { toMsgUser, loading, msgUser } = useSelector((S) => S.MsgSearchReducer)
    console.log(msgUser)
    const [searchListArray, setSearchListArray] = useState([]);
    const [searchTweetList, setSearchTweetList] = useState([]);

    function handleSearch(e) {
        setUser(e.target.value)
        dispatch(MsgSearchUser(e.target.value));
    }
    useEffect(() => {
        if (toMsgUser) {
            if (msgUser.length > 0) {
                setSearchListArray(msgUser)
            }
            else {
                setSearchListArray([])
            }
        }
    }, [toMsgUser, msgUser])

    function setOPacity() { /*SET BACKGROUND OPACITY*/
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 1;
        }
    }


    return <>
        <div className="shareTweetDiv" id="MSGDROPDOWN">
        <div className="shareePopup">
        <p className="shareTweetText">New Message</p>
       
            <input className="msgDDSearchIpt" type="text" value={user} onChange={handleSearch} placeholder="Search" />
            <div onClick={() => {
                document.getElementById("MSGDROPDOWN").style.display = "none"
                setOPacity();
            }}>
            <img src={deleteIcon} className="msgDelete" /></div>
            <hr className="shareTweetLine" id="msgLine" />
        </div>
        <div className="msgSearchFlexbox">
            {searchListArray.length > 0 ? (searchListArray.map((searchh) => {
                return <MsgUser name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} userNum={searchh._id} />
            })) : null}
        </div>
    </div>

    </>
}

export default MsgDropdown