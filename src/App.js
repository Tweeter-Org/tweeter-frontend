import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import EmailVerify from './component/Authentication/EmailVerify/emailVerify';
import ForgotPwd from './component/Authentication/ForgotPassword/forgotPwd';
import Login from './component/Authentication/Login/login';
import AuthOtp from './component/Authentication/OTP/otp';
import ResetPwd from './component/Authentication/ResetPassword/resetPwd';
import SignUp from './component/Authentication/SignUp/signUp';
import Error from './component/Assets/Error404/Error';
import SignUpTwo from './component/Authentication/SignUpTwo/SignUpTwo';
import Sidebar from './component/Sidebar/SideBar';
import HomePage from './component/Home Page/homePage';
import CreateTweet from './component/Home Page/createTweet';
import EmojiPicker from 'emoji-picker-react';
import Bookmarks from './component/Bookmarks/bookmarks';
import ProfilePage from './component/Profile/profilePage';
import EditProfile from './component/Profile/EditProfile';
import LogOut from './component/logOut/logOut';
import Google from "./component/Google"
import TagTweets from './component/Sidebar/TagTweets';
import OneTweet from './component/Reply/OneTweet';
import GoogleSignin from './component/Authentication/GoogleSign/GoogleSignIn';
import Counter from './component/counter';
import Messages1 from './component/Messages/Messages1';
import Chats from './component/Messages/Chats';
import PrivateRoute from './component/PrivateRoute';
import PhoneSearch from './component/Sidebar/PhoneSearch';
import ReactHashtag from 'react-hashtag';
import Notifications from './component/Notification/Notification';

function App() {

  const isUser = localStorage.getItem("access token")?true:false;
  console.log(isUser)
  return <>
    <BrowserRouter>
      <Routes>
      {isUser?(<Route path=""/>):(<Route path="/login" exact element={<Login />} />)}
     
        <Route path="/login" exact element={<Login />} />
        <Route exact path="/fgtpwd" element={<ForgotPwd />} />
        <Route exact path="/otp" element={<AuthOtp />} />
        <Route exact path="/verifyemail" element={<EmailVerify />} />
        <Route exact path="/reset" element={<ResetPwd />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signuptwo" element={<SignUpTwo />} />
        <Route exact path="/googlesign" element={<GoogleSignin />} />

        {/* {isUser?(  ):(<Route path="*" element={<Error />} />)} */}
       {isUser?( <Route path="/chats/:userid" element={<Chats />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?(  <Route path="/messages" element={<Messages1 />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?(  <Route path="/profile/:apiname" element={<ProfilePage />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?(  <Route path="/toTweet/:TweetId" element={<OneTweet />} />):(<Route path="*" element={<Error />} />)}
       {isUser?(<Route path="/tagtweet" exact element={<TagTweets />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?( <Route path="/bookmark" exact element={<Bookmarks />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?(   <Route path="/sidebar" exact element={<Sidebar />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?( <Route path="/editprofile" exact element={<EditProfile />} />):(<Route path="/error" element={<Error />} />)}
       {/* {isUser?(  <Route path="/" exact element={<HomePage />} />):(<Route path="*" element={<Error />} />)} */}
       {isUser?( <Route path="/phonesearch" element={<PhoneSearch />} />):(<Route path="/error" element={<Error />} />)}
       {isUser?(<Route path="/notification" exact element={<Notifications />} />):(<Route path="/error" element={<Error />} />)}
{/* 
       <Route path="/phonesearch" element={<PhoneSearch />} />
       <Route path="/chats/:userid" element={<Chats />} />
       <Route path="/messages" element={<Messages1 />} />
       <Route path="/profile/:apiname" element={<ProfilePage />} />
       <Route path="/toTweet/:TweetId" element={<OneTweet />} />
       <Route path="/tagtweet" exact element={<TagTweets />} />
       <Route path="/bookmark" exact element={<Bookmarks />} />
       <Route path="/editprofile" exact element={<EditProfile />} />
       <Route path="/sidebar" exact element={<Sidebar />} />
       <Route path="" exact element={<HomePage />} />
       <Route path="/notification" exact element={<Notifications />} /> */}
        <Route path="/google" element={<Google />} />
        <Route path="/logout" exact element={<LogOut />} /> 
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
