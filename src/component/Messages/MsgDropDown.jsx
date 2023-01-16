import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MsgSearchUser from "../../react-redux/actions/Message";
import MsgUser from "./User";

function MsgDropdown (){
    const [user, setUser] = useState("Search");
    const dispatch = useDispatch();
    const { toMsgUser, loading,msgUser } = useSelector((S) => S.MsgSearchReducer)
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
    return <>
    <div className="msgDDBlock1" id="MSGDROPDOWN">
        <p className="msgDDText1">New Message</p>
        <input className="msgDDSearchIpt" type="text" value={user} onChange={handleSearch} />
        <div>
                {searchListArray.length > 0?( searchListArray.map((searchh) => {
                            return <MsgUser name={searchh.name} username={searchh.user_name} displaypic={searchh.displaypic} />
                        })):null} 
                </div>
    </div>

    </>
}

export default MsgDropdown