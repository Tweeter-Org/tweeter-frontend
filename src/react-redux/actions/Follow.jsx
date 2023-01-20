import React from "react";
import BaseUrl from "./BaseUrl";

function FollowAction(username) {
    const accessToken = sessionStorage.getItem("access token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return async function (dispatch) {
        dispatch({
            type: "FOLLOW_START",
        })
        await BaseUrl.put(`/p/follow/${username}`, { username }, config)
            .then((res) => {
                dispatch({
                    type: "FOLLOW_SUCCESS",
                    payload: res
                })
            })
            .catch((err) => {
                dispatch({
                    type: "FOLLOW_FAILED",
                    payload: err
                })
            })
    }
}
export default FollowAction
