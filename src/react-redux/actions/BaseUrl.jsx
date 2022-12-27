import React from "react";
import axios from "axios"

export default axios.create({
    baseURL:"https://twitterbackend-production-93ac.up.railway.app"
})

