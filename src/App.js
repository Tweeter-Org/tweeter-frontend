import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailVerify from "./component/Authentication/EmailVerify/emailVerify";
import ForgotPwd from "./component/Authentication/ForgotPassword/forgotPwd";
import Login from "./component/Authentication/Login/login";
import AuthOtp from "./component/Authentication/OTP/otp";
import ResetPwd from "./component/Authentication/ResetPassword/resetPwd";
import SignUp from "./component/Authentication/SignUp/signUp";
import Error from "./component/Assets/Error404/Error";
import SignUpTwo from "./component/Authentication/SignUpTwo/SignUpTwo";
import Sidebar from "./component/Sidebar/SideBar";
import HomePage from "./component/Home Page/homePage";
import Bookmarks from "./component/Bookmarks/bookmarks";
import ProfilePage from "./component/Profile/profilePage";
import EditProfile from "./component/Profile/EditProfile";
import LogOut from "./component/logOut/logOut";
import Google from "./component/Authentication/GoogleSign/Google";
import TagTweets from "./component/Sidebar/TagTweets";
import OneTweet from "./component/Reply/OneTweet";
import GoogleSignin from "./component/Authentication/GoogleSign/GoogleSignIn";
import Messages1 from "./component/Messages/Messages1";
import Chats from "./component/Messages/Chats";
import PhoneSearch from "./component/Sidebar/PhoneSearch";
import Notifications from "./component/Notification/Notification";
import NotifTweet from "./component/Notification/NotifTweet";
import PrivateRoute from "./component/PrivateRoute";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" exact element={<Login />} />
          <Route exact path="/fgtpwd" element={<ForgotPwd />} />
          <Route exact path="/otp" element={<AuthOtp />} />
          <Route exact path="/verifyemail" element={<EmailVerify />} />
          <Route exact path="/reset" element={<ResetPwd />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signuptwo" element={<SignUpTwo />} />
          <Route exact path="/googlesign" element={<GoogleSignin />} />

          <Route
            path="/chats/:userid"
            element={
              <PrivateRoute>
                <Chats />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:apiname"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/toTweet/:TweetId"
            element={
              <PrivateRoute>
                <OneTweet />
              </PrivateRoute>
            }
          />
          <Route
            path="/editprofile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/phonesearch"
            element={
              <PrivateRoute>
                <PhoneSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/notiftweet/:TweetId"
            element={
              <PrivateRoute>
                <NotifTweet />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmark"
            element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>
            }
          />
          <Route
            path="/sidebar"
            element={
              <PrivateRoute>
                <Sidebar />
              </PrivateRoute>
            }
          />
          <Route
            path="/tagtweet"
            element={
              <PrivateRoute>
                <TagTweets />
              </PrivateRoute>
            }
          />
          <Route path="/google" element={<Google />} />
          <Route path="/logout" exact element={<LogOut />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
