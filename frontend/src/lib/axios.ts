import axios from "axios";
const API_ROOT = `${import.meta.env.VITE_API_URL}/api`;

// Axios instance
export const api = axios.create({
    baseURL: API_ROOT,
    withCredentials: true, // Required for JWT Cookie Auth
});