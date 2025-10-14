// src/api/cieClient.js
import axios from "axios";


const cieClient = axios.create({
    baseURL: import.meta.env.VITE_CIE_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});


export default cieClient;