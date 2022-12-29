
import { BrowserRouter, Routes , Route } from 'react-router-dom';
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

function App() {
  return <>
  <BrowserRouter>
  {/* <CreateTweet /> */}
    <Routes>
    <Route path="/bookmark" exact element={<Bookmarks />} />
    <Route path="/createtweet" exact element={<CreateTweet />} />
    <Route path="/sidebar" exact element={<Sidebar />} />
    <Route path="/home" exact element={<HomePage />} />
    <Route path="/" exact element={<Login />} />
      <Route exact path="/fgtpwd" element={<ForgotPwd />} />
      <Route exact path="/otp" element={<AuthOtp />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/verifyemail" element={<EmailVerify/>} />
      <Route exact path="/reset" element={<ResetPwd />} />
      <Route exact path="/signuptwo" element={<SignUpTwo />} />
      <Route exact path="/emojipicker" element={<EmojiPicker />} />
    </Routes> 
  </BrowserRouter>
  </>
}

export default App;
