import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// Axios instance
export const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
