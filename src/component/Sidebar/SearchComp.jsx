import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import ProfileAction, { ProfileApi } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg"

function SearchComp (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pro = useSelector((p)=>p.ProfileNameReducer)
    function toProfile (name){
        console.log(name)
        // dispatch(ProfileApi(name))
        
            navigate(`/profile/${name}`)
            console.log(`/profile?name=${name}`)
    }
    return <>
        <div className="searchcomp POPUPBG">
        {(props.displaypic === null) ? ( <span className="displaySearchPic"><img src={avatar}  id="picincircle" /></span>) :
                    ((props.displaypic.startsWith("https:")) ? ( <span className="displaySearchPic"><img src={props.displaypic} id="picincircle"/></span>) :
                        ( <span className="displaySearchPic">
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="picincircle" /></span>))
                }
            <p className="searchName">{props.name}</p>
            <p className="searchUsername" onClick={()=>{toProfile(props.username)}}>@{props.username}</p>
        </div>
    </>
}

export default SearchComp