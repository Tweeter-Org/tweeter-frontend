import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../Assets/avatar.svg"

function NoChats(){

    const {user} = useSelector((a)=>a.AuthReducer)
    // console.log(user)
    const [displaypic, setDisplaypic]= useState(null)
    useEffect(()=>{
        setDisplaypic(user.displaypic)
    },[])

    return <>
        <div className="noChatDiv" id="NOCHATBLOCK">
         {(displaypic === null) ? ( <img src={avatar} className="noChatProfile" />) :
                     (<img src={user.displaypic} className="noChatProfile" />) }
            {/* <img sr/c={user.displaypic}  /> */}
            <p className="noChatUser" >{user.name}</p>
            <p className="noChatMsg">Please select an user to start conversation</p>
        </div>
    </>
}

export default NoChats;