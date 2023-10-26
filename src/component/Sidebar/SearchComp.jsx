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
        // dispatch(ProfileApi(name))
        
            navigate(`/profile/${name}`)
    }
    return <>
        <div className="searchcomp POPUPBG ">

        {(props.displaypic === null) ? ( <img src={avatar}  id="picincircle" alt="avatar" />) :
                   ( <img src={props.displaypic} id="picincircle" alt="displaypic"/>) 
                    
                }
                <div className="searchNames">
                <p className="searchName">{props.name}</p>
            <p className="searchUsername" onClick={()=>{toProfile(props.username)}}>@{props.username}</p>
                </div>
           
        </div>
    </>
}

export default SearchComp