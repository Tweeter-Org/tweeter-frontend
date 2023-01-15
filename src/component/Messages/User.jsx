import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import ProfileAction, { ProfileApi } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg"

function MsgUser (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <>
        <div className="msgUser POPUPBG">
        {(props.displaypic === null) ? ( <img src={avatar}  id="msgPicincircle" />) :
                    ((props.displaypic.startsWith("https:")) ? (<img src={props.displaypic} id="msgPicincircle"/>) :
                        ( 
                        <img src={`https://twitterbackend-production-93ac.up.railway.app/${props.displaypic}`}  id="msgPicincircle" />))
                }
            {/* <p className="searchName">{props.name}</p> */}
            <p className="msgUsername">{props.name}</p>
        </div>
    </>
}

export default MsgUser