import React from 'react'
import authBgImg from "../Assets/AuthBgImage.svg";

function Background() {
  return (
    <div>
      <p classname="tweeterHeadd" style={{
        position: "absolute",
        width: "9vh",
        height: "9vh",
        left: "4vw",
        top: "1.5vh",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "2.5rem",
        lineHeight: "58px",
        fontFamily: "Kaushan Script",
        color: "#63DF76",
        opacity: "0.79",
        zIndex: 10
      }}>Tweeter</p>
      <div className='backgroundImage'
        style={{
          "position": "absolute",
          "width": "100%",
          "height": "100vh",
          "overflow": "hidden",
          "backgroundImage": `url(${authBgImg})`,
          "background": "norepeat center fixed",
          "backgroundSize": "cover",
          overflow: "hidden"
        }} />
    </div>
  )
}

export default Background
