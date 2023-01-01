import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/SideBar";
import "./profilePage.css"
import avatar from "../Assets/avatar.svg";
import post from "../Assets/posts.svg"
import { useDispatch , useSelector } from "react-redux";
import ProfileAction from "../../react-redux/actions/Profile";

function ProfilePage (){
const dispatch = useDispatch();
const [name, setName] = useState("");
const [username, setUserName] = useState("");
const [bio, setBio] = useState("");
const [email, setEmail] = useState("");
const [displaypic, setDisplaypic]= useState("");
const [createdAt, setCreatedAt] = useState("");
const [updatedAt, setUpdatedAt] = useState("");
const [followers, setFollower]= useState("");
const [following, setFollowing] = useState("")
const [myProfile, setMyProfile] = useState(false)
const auth = useSelector((s)=>s.AuthReducer)
const {user, toFgtPwd} = auth;
const nameInApi = user.user_name
localStorage.setItem("usernameInApi",nameInApi)
console.log(auth)
const profilee = useSelector((p)=>p.ProfileReducer)
const {profile,  accessProfile, loading} = profilee;
    useEffect(()=>{
        dispatch(ProfileAction(nameInApi));
        if(accessProfile){
            setFollower(profile.followers)
            setFollowing(profile.following)
            setMyProfile(profile.myprofile)
            setName(profile.user.name)
            setUserName(profile.user.user_name)
            setBio(profile.user.bio)
            setEmail(profile.user.email)
            setCreatedAt(profile.user.createdAt)
            setUpdatedAt(profile.user.updatedAt)
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
            {myProfile?(<button className="pEdiitProfile">Edit Profile</button>):(<button className="pProfileFollow">Follow</button>)}
            </div>
            </div>
            <div className="profileDiv2">
            <p className="pText1">{name}</p>
            <p className="pText2">@{username}</p>
            <p className="pText4">{email}</p>
            <p className="pText3">
                {bio}jhbajsvhcmdhsv cv avnv dhbsvhfsvdh
            </p>
            <p className="pText5"><span id="create">Created At: </span>{createdAt}</p>
            <p className="pText6"><span id="update">Updated At: </span>{updatedAt}</p>
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
    </>
}
export default ProfilePage