import FormData from "form-data";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProfileAction, { EditProfileAction, FakeEditProfile } from "../../react-redux/actions/Profile";
import avatar from "../Assets/avatar.svg";
import "./profilePage.css"
import { useState } from "react";
import Loader from "../Assets/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
    const navigate = useNavigate()
   

    const [sendImage, setSendImage] = useState([]);
    const profilee = useSelector((p) => p.ProfileReducer)
    const { profile, accessProfile, loading, editprofile, ifedit, profileTweet } = profilee;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [editProfileImage, setEditprofileImage] = useState(null);
    const [toastBool, setToastBool] = useState(false)
    useEffect(() => {
        if (accessProfile) {
            if (profile.myprofile) {
                setUsername(profile.user.user_name)
                // setName(profile.user.name)
                // setBio(profile.user.bio)
                setEditprofileImage(profile.user.displaypic)
            }
        }
    })
    function handleSendImage(e) {
        var imageProfile = document.getElementById("editprofileimage");
        imageProfile.src = URL.createObjectURL(e.target.files[0])
        setEditprofileImage(URL.createObjectURL(e.target.files[0]))
        setSendImage(e.target.files[0])
        document.getElementById("editprofileimage").style.display = "block";
        document.getElementById("editImage").style.display = "none"
    }
    function handleName(e) {
        setName(e.target.value)
    }
    function handleBio(e) {
        setBio(e.target.value)
    }
    const fd = new FormData();
    const { apiname } = useParams();
    const dispatch = useDispatch()
    function handleEditProfile(e) {
        e.preventDefault()
        fd.append("name", name)
        fd.append("bio", bio)
        fd.append("image", sendImage)
        dispatch(EditProfileAction(fd))
        dispatch(ProfileAction(apiname))
        setToastBool(true)
        navigate(`/profile/${username}`)
        // dispatch(FakeEditProfile(name, bio, editProfileImage))
        document.getElementsByClassName("editPrDiv")[0].style.display = "none";
        setOPacity();
    }
    function setOPacity() {
        var items = document.getElementsByClassName("POPUPBG")
        for (var i = 0; i < items.length; i++) {
            document.getElementsByClassName("POPUPBG")[i].style.opacity = 1;
        }
    }
    function handlecancel() {
        // navigate("/profile");
        document.getElementsByClassName("editPrDiv")[0].style.display = "none";
        setOPacity()
    }
    return <>
        <div className="editPrDiv">
            {accessProfile ? ((editProfileImage === null) ? (<img src={avatar} id="editImage" className="pEditImage" />) :
                ((editProfileImage.startsWith("https:")) ? (<img src={editProfileImage} id="editImage" className="pEditImage" />) :
                    (
                        <img src={editProfileImage} id="editImage" className="pEditImage" />))) : null}

            <p><img id="editprofileimage" /></p>
            <form enctype="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                <label for="editProfileUploadImg"><p className="editImagetext">Edit Picture or Avatar</p></label>
                <input type="file" id="editProfileUploadImg" accept="image/png, image/jpg, image/jpeg" onChange={handleSendImage} hidden />
                {accessProfile?(<>
                    <p className="editName">Name</p>
                <div className="div1"><input type="text" className="editNameInput" onChange={handleName} value={name} placeholder={profile.user.name} ></input></div>
                <p className="editBio">Bio</p>
                <div className="div2"><input type="text" className="editBioInput" onChange={handleBio} value={bio} placeholder={profile.user.bio}></input></div>
                <button className="ctCancelTweet" id="editPCancel" onClick={handlecancel}>Cancel</button>
                <button className="ctCreateTweet" id="editPDone" onClick={handleEditProfile}>Edit</button></>
                ):<>
                <p className="editName">Name</p>
                <div className="div1"><input type="text" className="editNameInput" onChange={handleName} value={name} placeholder="Enter your name" ></input></div>
                <p className="editBio">Bio</p>
                <div className="div2"><input type="text" className="editBioInput" onChange={handleBio} value={bio} placeholder="About you"></input></div>
                <button className="ctCancelTweet" id="editPCancel" onClick={handlecancel}>Cancel</button>
                <button className="ctCreateTweet" id="editPDone" onClick={handleEditProfile}>Edit</button>
                </>}
                
            </form>
        </div>
        <ToastContainer />
    </>
}

export default EditProfile;