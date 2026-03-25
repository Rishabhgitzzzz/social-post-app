import axios from "axios";

const API = axios.create({
    baseURL: "https://social-post-app-lanj.onrender.com/api/v1"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.token = token;
    }
    return req;
});

export default API;