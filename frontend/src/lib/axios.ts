import axios from "axios";
const ROOT = "/api"

// Axios instance
export const api = axios.create({
    baseURL: ROOT,
    withCredentials: true, // Required for JWT Cookie Auth
});
