import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

interface QueueItem {
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void
}

// Axios instance
export const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Response flags and reducers
let isRefreshing = false;
let failedQueue: QueueItem[] = []

// Reduce queue
const processQueue = (error: Error | null, token: unknown = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            return prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Get original request config
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        if (!originalRequest) {
            return Promise.reject(error)
        }

        // Check status. If its forbidden and we havent retried handle it
        if (error.response?.status === 401 && !originalRequest._retry) {
            // If its already made an attempt add it to the queue and try again when unblocked
            if (isRefreshing) {
                return new Promise<unknown>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            // Set blocker flags
            originalRequest._retry = true;
            isRefreshing = true;

            // Interceptor logic
            try {
                // Try get a refresh token
                await api.post("/auth/token/refresh");

                // If successful process the queue (resolve the token) and try again
                processQueue(null);
                return api(originalRequest);
            } catch (refreshError) {
                // If error process queue with an error and navigate to login

                const err = refreshError instanceof Error ? refreshError : new Error("Refresh failed")
                processQueue(err, null);
                window.location.href = "/login"; // Replace this with react router navigate eventually
                return Promise.reject(error);
            } finally {
                // Unblock
                isRefreshing = false;
            }
        }

        // For none 401 status reject
        return Promise.reject(error)
    }
)

