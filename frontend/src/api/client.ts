import { api } from "@/lib";
import { type InternalAxiosRequestConfig } from "axios";
import { ENDPOINTS } from "./endpoints";

export { api as client };

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
};

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
}

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalConfig = error.config;

        if (error.response?.status !== 401) { return Promise.reject(error) }

        if (originalConfig.url?.includes(ENDPOINTS.AUTH.TOKEN_REFRESH)) {
            return Promise.reject(error)
        }

        if (!originalConfig._retry) {
            originalConfig._retry = true;

            try {
                await api.post(ENDPOINTS.AUTH.TOKEN_REFRESH);
                return api(originalConfig);
            } catch (error) {
                return Promise.reject(error)
            }
        }

        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        if (
            ["post", "put", "patch", "delete"].includes(
                config.method?.toLowerCase() as string
            )
        ) {
            const csrfToken = getCookie("csrftoken");

            if (csrfToken) {
                config.headers["X-CSRFToken"] = csrfToken;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);
