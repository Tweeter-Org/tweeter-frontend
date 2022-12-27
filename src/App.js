
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

function App() {
  return <>
  <BrowserRouter>
    <Routes>
    <Route path="/sidebar" exact element={<Sidebar />} />
    <Route path="/home" exact element={<HomePage />} />
    <Route path="/" exact element={<Login />} />
      <Route exact path="/fgtpwd" element={<ForgotPwd />} />
      <Route exact path="/otp" element={<AuthOtp />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/verifyemail" element={<EmailVerify/>} />
      <Route exact path="/reset" element={<ResetPwd />} />
      <Route exact path="/signuptwo" element={<SignUpTwo />} />
    </Routes> 
  </BrowserRouter>
  </>
}

export default App;
