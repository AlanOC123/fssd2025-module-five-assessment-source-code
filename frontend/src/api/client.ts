import { api } from "@/lib";
import { type InternalAxiosRequestConfig } from "axios";
import { ENDPOINTS } from "./endpoints";

export { api };

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let logoutCallback: (() => void) | null = null;

interface QueueItem {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}

// Response flags and reducers
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

export const registerCallback = (cb: () => void) => {
    logoutCallback = cb;
}


function getCookie(name: string) {
    let cookieVal = null;

    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length - 1; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieVal = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieVal;
}

// Reduce queue
function processQueue(error: Error | null, token: unknown = null) {
    failedQueue.forEach((prom) => {
        if (error) {
            return prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Get original request config
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        if (!originalRequest) {
            return Promise.reject(error);
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
                await api.post(ENDPOINTS.AUTH.TOKEN_REFRESH);

                // If successful process the queue (resolve the token) and try again
                processQueue(null);
                return api(originalRequest);
            } catch (refreshError) {
                // If error process queue with an error and navigate to login

                const err =
                    refreshError instanceof Error
                        ? refreshError
                        : new Error("Refresh failed");
                processQueue(err, null);
                
                if (logoutCallback) {
                    logoutCallback()
                }

                return Promise.reject(error);
            } finally {
                // Unblock
                isRefreshing = false;
            }
        }

        // For none 401 status reject
        return Promise.reject(error);
    }
);

api.interceptors.request.use((config) => {
    if (["post", "put", "patch", "delete"].includes(config.method?.toLowerCase() as string)) {
        const csrfToken = getCookie("csrftoken");

        if (csrfToken) {
            config.headers["X-CSRFToken"] = csrfToken;
        }
    }

    return config;
}, (error) => Promise.reject(error))