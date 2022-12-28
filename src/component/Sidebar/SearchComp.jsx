import React from "react"
import avatar from "../Assets/avatar.svg"

function SearchComp (props){
    return <>
        <div className="searchcomp poopupbg4">
        <span className="displaySearchPic"><img src={avatar} id="picincircle"/></span>
            <p className="searchName">{props.name}</p>
            <p className="searchUsername">{props.username}</p>
        </div>
    </>
}

export default SearchComp