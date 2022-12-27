import React from "react"

function SearchComp (props){
    return <>
        <div className="searchcomp">
        <span className="displaypie" id="displaySearch"/>
            <p className="searchName">{props.name}</p>
            <p className="searchUsername">{props.username}</p>
        </div>
    </>
}

export default SearchComp