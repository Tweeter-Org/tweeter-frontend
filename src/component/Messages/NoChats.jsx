import React from "react";

function NoChats(){

    const {user} = useSelector((a)=>a.AuthReducer)

    return <>
        <div className="noChatDiv" id="NOCHATBLOCK">
         {(user.displaypic === null) ? ( <img src={avatar} className="noChatProfile" />) :
                    ((user.displaypic.startsWith("https:")) ? (<img src={user.displaypic} className="noChatProfile" />) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${user.displaypic}`} className="noChatProfile" />))
                }
            {/* <img sr/c={user.displaypic}  /> */}
            <p className="noChatUser" >{user.name}</p>
            <p className="noChatMsg">Please select an user to start conversation</p>
        </div>
    </>
}

export default NoChats;