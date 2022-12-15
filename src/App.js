
import './App.css';
import EmailVerify from './component/Authentication/EmailVerify/emailVerify';
import ForgotPwd from './component/Authentication/ForgotPassword/forgotPwd';
import Login from './component/Authentication/Login/login';
import AuthOtp from './component/Authentication/OTP/otp';
import ResetPwd from './component/Authentication/ResetPassword/resetPwd';
import SignUp from './component/Authentication/SignUp/signUp';

function App() {
  return <>
    <Login />
    {/* <ForgotPwd /> */}
    {/* <AuthOtp title="Otp" /> */}
    {/* <ResetPwd /> */}
    {/* <EmailVerify /> */}
    {/* <SignUp /> */}
  </>
}

export default App;
