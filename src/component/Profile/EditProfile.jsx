import FormData from "form-data";
import React, { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditProfileAction } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg";
import "./profilePage.css"
import { useState } from "react";
import Loader from "../Assets/Loader";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
    const navigate = useNavigate()
    const NAME =  sessionStorage.getItem("profile name")
    const BIO = sessionStorage.getItem("profile bio")
    const [name, setName] = useState(NAME);
    const [bio, setBio] = useState(BIO);
    const [sendImage, setSendImage] = useState([]);
    const profilee = useSelector((p) => p.ProfileReducer)
    const { profile , accessProfile , loading , editprofile , ifedit , profileTweet} = profilee;
    function handleSendImage(e) {
        console.log(e.target.files);
        setSendImage(e.target.files[0])
        console.log(e.target.files[0])
    }
    function handleName(e) {
        setName(e.target.value)
    }
    function handleBio(e) {
        setBio(e.target.value)
    }
    const fd = new FormData();
    const dispatch = useDispatch()
    function handleEditProfile(e) {
        e.preventDefault()
        fd.append("name", name)
        fd.append("bio", bio)
        fd.append("image", sendImage)

        dispatch(EditProfileAction(fd))
        navigate("/profile")
        if (editprofile !== "") {
            toast.success(`${editprofile}`, {
                position: "top-center",
                theme: "light",
            });
        }
    }
    function setOPacity (){
        var items= document.getElementsByClassName("POPUPBG")
        for(var i=0;i<items.length;i++){
            document.getElementsByClassName("POPUPBG")[i].style.opacity=1;
        }
    }
    function handlecancel() {
        // navigate("/profile");
        document.getElementsByClassName("editPrDiv")[0].style.display = "none";
      setOPacity()
    }

    return <>
        <div className="editPrDiv">
            <img src={avatar} className="pEditImage" />
            <form enctype="multipart/form-data" onSubmit={(e)=>e.preventDefault()}>
                <label for="ctuploadImg"><p className="editImagetext">Edit Picture or Avatar</p></label>
                <input type="file" id="ctuploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
                <p className="editName">Name</p>
                <div className="div1"><input type="text" className="editNameInput" onChange={handleName} value={name} ></input></div>
                <p className="editBio">Bio</p>
                <div className="div2"><input type="text" className="editBioInput" onChange={handleBio} value= {bio}></input></div>
                <button className="ctCancelTweet" id="editPCancel" onClick={handlecancel}>Cancel</button>
                <button className="ctCreateTweet" id="editPDone" onClick={handleEditProfile}>Edit</button>
            </form>
        </div>
        <ToastContainer />
    </>
}

export default EditProfile;