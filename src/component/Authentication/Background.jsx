import React from 'react'
import authBgImg from "../Assets/AuthBgImage.svg";

function Background(){
  return (
    <div>
    <p classname="tweeterHeadd" style={{ position: "absolute",
width: "9vh",
height: "9vh",
left: "4vw",
top: "1.5vh",
fontStyle: "normal",
fontWeight: "400",
fontSize: "2.5rem",
lineHeight: "58px",
fontFamily:"Kaushan Script",
color:"#63DF76",
opacity:"0.79",
zIndex:10}}>Tweeter</p>
        <img src={authBgImg} id="authBgImg" style={{
          // position:"absolute",
          //  height:"110vh",
    // width:"100vw",
    backgroundSize: "cover",
    background: " noRepeat center fixed",
    overflow:"hidden",
    zIndex:5
        }} />
    </div>
  )
}

export default Background
