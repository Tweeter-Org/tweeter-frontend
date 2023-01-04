import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/SideBar";
import "./profilePage.css"
import avatar from "../Assets/avatar.svg";
import profileIcon from "../Assets/profile.svg";
import newprofile from "../Assets/newProfile.png";
import post from "../Assets/posts.svg"
import { useDispatch, useSelector } from "react-redux";
import ProfileAction from "../../react-redux/actions/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import FollowComp from "./FollowComp";
import Tweet from "../Home Page/TweetComp";
import { LikedTweetAction } from "../../react-redux/actions/Tweets";
import Loader from "../Assets/Loader";
import ProfileTweet from "./profileTweets";
import FollowAction from "../../react-redux/actions/Follow";

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [displaypic, setDisplaypic] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [followers, setFollower] = useState("");
    const [following, setFollowing] = useState("")
    const [myProfile, setMyProfile] = useState(false)
    const auth = useSelector((s) => s.AuthReducer)
    const [followerArray, setFollowerArray] = useState([])
    const [followingArray, setFollowingArray] = useState([])

    const [tweetsArray, setTweetsArray] = useState([])
   
var nameInApi = sessionStorage.getItem("usernameInApi")

const pro = useSelector((p)=>p.ProfileNameReducer)
console.log(pro)
const [dynamic, setDynamic] = useState("")
useEffect(()=>{
    setDynamic(pro.name)
},[pro])
const profilee = useSelector((p) => p.ProfileReducer)
const { profile , accessProfile , loading , editprofile , ifedit , profileTweet} = profilee;
console.log(profileTweet)
    useEffect(() => {
        dispatch(ProfileAction(pro.name));
        if (accessProfile) {
            setFollower(profile.followers.length)
            setFollowing(profile.following.length)
            setMyProfile(profile.myprofile)
            setName(profile.user.name)
            setUserName(profile.user.user_name)
            setBio(profile.user.bio)
            setEmail(profile.user.email)
            setCreatedAt(profile.user.createdAt)
            setUpdatedAt(profile.user.updatedAt)
            setDisplaypic(profile.user.displaypic)
            setFollowerArray(profile.followers)
            setFollowingArray(profile.following)
            setTweetsArray(profileTweet)
        }
    }, [pro.name])
    useEffect(()=>{
        if(ifedit){
            console.log(editprofile)
        }
    },[ifedit])

    console.log(profilee)

    function setOPacity (){
        var items= document.getElementsByClassName("POPUPBG")
        for(var i=0;i<items.length;i++){
            document.getElementsByClassName("POPUPBG")[i].style.opacity=0.2;
        }
    }
    const followed = useSelector((f) => f.FollowReducer)

    function handleFollowers() {
        dispatch(FollowAction(username))
        var imagepath = document.getElementsByClassName("pProfileFollow")[0].innerHTML;
        if (imagepath === "Follow") {
            document.getElementsByClassName("pProfileFollow")[0].innerHTML = "Following";
        }
        else {
            document.getElementsByClassName("pProfileFollow")[0].innerHTML = "Follow";
        }
    }
    function displayFollowers() {
        document.getElementsByClassName("profileDiv3")[0].style.display = "none";
        document.getElementsByClassName("profileDiv4")[0].style.display = "flex";
        document.getElementsByClassName("followersFlex")[0].style.display = "flex";
        document.getElementsByClassName("followingFlex")[0].style.display = "flex";
    }
    function displayTweets() {
        document.getElementsByClassName("profileDiv3")[0].style.display = "flex";
        document.getElementsByClassName("profileDiv4")[0].style.display = "none";
        document.getElementsByClassName("followersFlex")[0].style.display = "none";
        document.getElementsByClassName("followingFlex")[0].style.display = "none";
    }
    function handleEdit() {
        document.getElementsByClassName("editPrDiv")[0].style.display = "flex";
        setOPacity()
    }
    function showFollowers(){
        document.getElementsByClassName("followersFlex")[0].style.display = "flex";
        document.getElementsByClassName("followingFlex")[0].style.display = "none";
        document.getElementsByClassName("pFollowerHead")[0].style.color = "green";
        document.getElementsByClassName("pFollowingHead")[0].style.color = "white";
        document.getElementById("likeTweetFlex").style.display="none"
        document.getElementById("profileTweetFlex").style.display="none"
    }
    function showFollowing(){
        document.getElementsByClassName("followingFlex")[0].style.display = "flex";
        document.getElementsByClassName("followersFlex")[0].style.display = "none";
        document.getElementsByClassName("pFollowingHead")[0].style.color = "#47c87a";
        document.getElementsByClassName("pFollowerHead")[0].style.color = "white";
        document.getElementById("likeTweetFlex").style.display="none"
        document.getElementById("profileTweetFlex").style.display="none"
    }
    function showTweets(){
        document.getElementsByClassName("tweetPrFlexbox")[0].style.display = "flex";
        document.getElementById("likeTweetFlex").style.display="none"
        document.getElementById("profileTweetFlex").style.display="flex"
    }
    function showLikedTweets (){
        dispatch(LikedTweetAction(username))
        document.getElementById("likeTweetFlex").style.display="flex"
        document.getElementById("profileTweetFlex").style.display="none"
    }
    
    const {likedTweets} = useSelector((l)=>l.LikedTweetsPReducer)
    // useEffect(()=>{
    //     if(loading===true){
    //         document.body.style.opacity = 0.5;
    //     }
    //     else{
    //         document.body.style.opacity = 1;
    //     }
    // },[loading])

    return <>
        <Sidebar />
        <div className="PROFILE POPUPBG">
            <div className="profileDiv1">
            {(displaypic === null) ? (<img src={avatar}  className="pImage"  />) :
                    ((displaypic.startsWith("https:")) ? (<img src={displaypic}  className="pImage"  />) :
                        (<img src={`https://twitterbackend-production-93ac.up.railway.app/${displaypic}`}  className="pImage"  />))
                }
                <div className="PBLOCK1">
                    <div className="pBlock1">
                        <p className="pTweet1">Tweets</p>
                        <p className="pTweet1" id="pFollowers" onClick={() => { displayFollowers();showFollowers() }}>Followers</p>
                        <p className="pTweet1" onClick={() => { displayFollowers();showFollowing() }} >Following</p>
                    </div>
                    <div className="pBlock2">
                        <p className="pTweetCount" id="tweetCount">{tweetsArray.length}</p>
                        <p className="pTweetCount">{followers}</p>
                        <span>
                            <p className="pTweetCount" id="followCount">{following}</p>
                        </span>
                    </div>
                    {myProfile ? (<button className="pEdiitProfile" onClick={() => { handleEdit() }}>Edit Profile</button>)
                        : (profile.isfollowing ? (<button className="pProfileFollow" onClick={() => { handleFollowers() }} >Following </button>)
                         : (<button className="pProfileFollow" onClick={() => { handleFollowers() }}>Follow</button>))}
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
                {myProfile ? <p className="pText6"><span id="update">Updated At: </span>{updatedAt}</p> : null}
            </div>
            <div className="profileDiv3">
                <p className="pTweetHead" onClick={()=>{showTweets()}}>Tweets</p>
                <p className="pTweetReply">Tweets & Replies</p>
                <p className="pLikehead" onClick={showLikedTweets}>Likes</p>
            </div>
            <div className="profileDiv4">
                <p className="pFollowerHead" onClick={()=>{showFollowers()}}>Followers</p>
                <p className="pFollowingHead"  onClick={()=>{showFollowing()}}>Following</p>
                <img src={post} className="pPost" onClick={() => { displayTweets() }} />
            </div>
            <hr className="pLine" />
            <div className="followersFlex">
        {followers>0?(followerArray.map((f)=>{
            return <FollowComp name={f} />
        })):<p className="alterFollower">No Followers</p>}
        </div>
        <div className="followingFlex">
        {following>0?(followingArray.map((f)=>{
            return <FollowComp name={f} />
        })):<p className="alterFollower">No Followings</p>}
        </div> 
        <div className="tweetPrFlexbox" id="profileTweetFlex">
        {tweetsArray.length>0?(tweetsArray.map((tweet, index)=>{
        return <ProfileTweet text={tweet.text} likeCount={tweet.likes} image={tweet.image} video={tweet.video} username={tweet.user.user_name} displaypic={tweet.user.displaypic} tweetId={tweet._id} number={index} bookmarkb ="false" />;
    })):null}
        </div>
        <div className="tweetPrFlexbox" id="likeTweetFlex">
        {likedTweets.length>0?(likedTweets.map((tweet, index)=>{
        return <ProfileTweet text={tweet.text} likeCount={tweet.likes} image={tweet.image} video={tweet.video} username={tweet.user.user_name} displaypic={tweet.user.displaypic} tweetId={tweet._id} number={index} bookmarkb ="false" />;
    })):null}
        </div>
        </div>
        <EditProfile />
        {/* {loading===true?<Loader loading={loading}/>:null} */}
    </>
    
}
export default ProfilePage