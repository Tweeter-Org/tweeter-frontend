import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/SideBar";
// import "./profilePage.css"
import avatar from "../Assets/avatar.svg";
import post from "../Assets/posts.svg"
import { useDispatch , useSelector } from "react-redux";
import ProfileAction from "../../react-redux/actions/Profile";
import { useNavigate } from "react-router-dom";
// import EditProfile from "./EditProfile";
import EditProfile from "../Profile/EditProfile";
import FollowAction from "../../react-redux/actions/Follow";


const OthersProfile = () => {

    const dispatch = useDispatch();
const navigate = useNavigate()
const [name, setName] = useState("");
const [username, setUserName] = useState("");
const [bio, setBio] = useState("");
const [email, setEmail] = useState("");
const [displaypic, setDisplaypic]= useState("");
const [createdAt, setCreatedAt] = useState("");
const [updatedAt, setUpdatedAt] = useState("");
const [followers, setFollower]= useState("");
const [following, setFollowing] = useState("")
const [isFollow, setIsFollow]= useState(false)
const [myProfile, setMyProfile] = useState(false)

// const usernameApi = localStorage.getItem("usernameInApi")
// console.log(auth)
const profilee = useSelector((p)=>p.ProfileReducer)
const {profile,  accessProfile, loading} = profilee;
    useEffect(()=>{
        const usernameApi = localStorage.getItem("usernameInApi")
        // console.log(usernameApi)
        dispatch(ProfileAction(usernameApi));
        if(accessProfile){
            setFollower(profile.followers.length)
            setFollowing(profile.following.length)
            setMyProfile(profile.myprofile)
            setName(profile.user.name)
            setUserName(profile.user.user_name)
            setBio(profile.user.bio)
            setEmail(profile.user.email)
            setCreatedAt(profile.user.createdAt)
            setUpdatedAt(profile.user.updatedAt)
            setIsFollow(profile.user.isfollowing)
        }
    },[])

console.log(profilee)

    function displayFollowers(){
        document.getElementsByClassName("profileDiv3")[0].style.display="none";
        document.getElementsByClassName("profileDiv4")[0].style.display="flex";

    }
    function displayTweets(){
        document.getElementsByClassName("profileDiv3")[0].style.display="flex";
        document.getElementsByClassName("profileDiv4")[0].style.display="none";
    }
    function handleEdit(){
        document.getElementsByClassName("editPrDiv")[0].style.display="flex";
    }
// const followed = useSelector((f)=>f.)
    function handleFollowers(){
        dispatch(FollowAction(username))
        var imagepath = document.getElementsByClassName("pProfileFollow")[0].innerHTML;
            if(imagepath==="Follow"){
                document.getElementsByClassName("pProfileFollow")[0].innerHTML= "Following";
            }
            else{
                document.getElementsByClassName("pProfileFollow")[0].innerHTML= "Follow";
            }
    }
    return <>
        <Sidebar />
        <div className="PROFILE">
            <div className="profileDiv1">
            <img src={avatar} className="pImage" />
            <div className="PBLOCK1">
            <div className="pBlock1">
            <p className="pTweet1">Tweets</p>
            <p className="pTweet1" id="pFollowers" onClick={()=>{displayFollowers()}}>Followers</p>
            <p className="pTweet1">Following</p>
            </div>
            <div className="pBlock2">
            <p className="pTweetCount" id="tweetCount">40</p>
            <p className="pTweetCount">{followers}</p>
            <span>
            <p className="pTweetCount" id="followCount">{following}</p>
            </span>
            </div>
            {myProfile?(<button className="pEdiitProfile" onClick={()=>{handleEdit()}}>Edit Profile</button>)
            :(isFollow?(<button className="pProfileFollow">Following </button>):(<button className="pProfileFollow" onClick={()=>{handleFollowers()}}>Follow</button>))}
            </div>
            </div>
            <div className="profileDiv2">
            <p className="pText1">{name}</p>
            <p className="pText2">@{username}</p>
            <p className="pText4">{email}</p>
            <p className="pText3">
                {bio}
            </p>
            <p className="pText5"><span id="create">Created At: </span>{createdAt}</p>
           {myProfile?<p className="pText6"><span id="update">Updated At: </span>{updatedAt}</p>:null} 
            </div>
            <div className="profileDiv3">
            <p className="pTweetHead">Tweets</p>
            <p className="pTweetReply">Tweets & Replies</p>
            <p className="pLikehead">Likes</p>
            </div>
            <div className="profileDiv4">
            <p className="pFollowerHead">Followers</p>
            <p className="pFollowingHead">Following</p>
            <img src={post} className="pPost"  onClick={()=>{displayTweets()}}/>
            </div>
            <hr className="pLine" />
        </div>
        <EditProfile />
  </>
}

export default OthersProfile