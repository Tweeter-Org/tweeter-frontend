import FormData from "form-data";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditProfileAction } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg";
import "./profilePage.css"
import { useState } from "react";

function EditProfile() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [sendImage, setSendImage] = useState([]);
    function handleSendImage(e) {
        console.log(e.target.files);
        setSendImage(e.target.files[0])
        console.log(e.target.files[0])
        // fd.append("file",e.target.files[0])
    }
    function handleName(e) {
        setName(e.target.value)
    }
    function handleBio(e) {
        setBio(e.target.value)
    }
    const fd = new FormData();
    const dispatch = useDispatch()
    function handleEditProfile(e){
        e.preventDefault()
        fd.append("name",name)
        fd.append("bio",bio)
        fd.append("image",sendImage)

        dispatch(EditProfileAction(fd))
        navigate("/profile")
    }
    function handlecancel(){
        navigate("/profile");
         document.getElementsByClassName("editPrDiv")[0].style.display = "none"; 
         document.getElementsByClassName("poopupbg1")[0].style.opacity = 1;
         document.getElementsByClassName("poopupbg2")[0].style.opacity = 1;
         document.getElementsByClassName("poopupbg3")[0].style.opacity = 1;
         document.getElementsByClassName("poopupbg4")[0].style.opacity = 1;
    }
    return <>
        <div className="editPrDiv poopupbg">
            <img src={avatar} className="pEditImage" />
            <form onSubmit={handleEditProfile}  enctype="multipart/form-data">
            <label for="ctuploadImg"><p className="editImagetext">Edit Picture or Avatar</p></label>
            <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
            <p className="editName">Name</p>
            <div className="div1"><input type="text" className="editNameInput" onChange={handleName}></input></div>
            <p className="editBio">Bio</p>
            <div className="div2"><input type="text" className="editBioInput" onChange={handleBio} ></input></div>
            <button className="ctCancelTweet" id="editPCancel" onClick={handlecancel}>Cancel</button>
            <button className="ctCreateTweet" id="editPDone" >Edit</button>
            </form>
        </div>
    </>
}

export default EditProfile;