import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import BaseUrl from "./BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileAction(username) {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "VIEW_PROFILE",
        })
        await BaseUrl.get(`/p/${username}`, config)
            .then((res) => {
                dispatch({
                    type: "VIEW_PROFILE_SUCCED",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "VIEW_PROFILE_FAIL",
                    payload: err
                })
            })
    }
}

export default ProfileAction

function EditProfileAction(fd) {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "EDIT_PROFILE",
        })
        await BaseUrl.put("/p/editprofile", fd, config)
            .then((res) => {
                console.log(res)
                toast.success(`${res.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "EDIT_PROFILE_SUCCED",
                    payload: res
                })
            })
            .catch((err) => {
                console.log(err)
                toast.error(`${err.response.data.msg}`, {
                    position: "top-center",
                    theme: "light",
                });
                dispatch({
                    type: "EDIT_PROFILE_FAIL",
                    payload: err
                })
            })
    }
}

export { EditProfileAction }

export const FakeEditProfile = (name, username, displaypic) => {
    return {
        type: "FAKE_EDIT_PROFILE",
        payload: {
            name, username, displaypic
        }
    }
}

export const ProfileApi = (name) => {
    return {
        type: "PROFILE_API_NAME",
        payload: name
    }
}