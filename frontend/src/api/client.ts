/**
 * Global API Client Configuration.
 * * This module configures the Axios interceptors that handle the "Hidden" authentication logic.
 * * Key Features:
 * 1. Automatic CSRF Protection: Reads the Django 'csrftoken' cookie and injects it into headers.
 * 2. Transparent Token Refresh: Intercepts 401 errors, refreshes the session, and retries the request.
 */

import { api } from "@/lib";
import { AUTH_ENDPOINTS } from "@/features/auth";

// Re-export the configured instance for use in services
export { api as client };

/**
 * Helper to extract specific cookies (like csrftoken) from the browser.
 */
function getCookie(name: string) {
    let cookieVal = null;

    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length - 1; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieVal = decodeURIComponent(
                    cookie.substring(name.length + 1),
                );
                break;
            }
        }
    }

    return cookieVal;
}

// --- 1. Request Interceptor: CSRF Injection ---
api.interceptors.request.use(
    (config) => {
        // Only inject CSRF tokens for mutating requests (POST, PUT, PATCH, DELETE)
        if (
            ["post", "put", "patch", "delete"].includes(
                config.method?.toLowerCase() as string,
            )
        ) {
            const csrfToken = getCookie("csrftoken");

            if (csrfToken) {
                // Django expects this specific header key
                config.headers["X-CSRFToken"] = csrfToken;
            }
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// --- 2. Response Interceptor: Auto-Refresh Logic ---
api.interceptors.response.use(
    (response) => response, // Pass successful responses through
    async (error) => {
        const originalConfig = error.config;

        // Condition A: If it's not a 401, we can't handle it here.
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Condition B: If the error came FROM the refresh endpoint itself,
        // it means the refresh token is also expired. Stop the loop.
        if (originalConfig.url?.includes(AUTH_ENDPOINTS.tokenRefresh)) {
            return Promise.reject(error);
        }

        // Condition C: If we haven't tried to refresh yet...
        if (!originalConfig._retry) {
            originalConfig._retry = true;

            try {
                // 1. Attempt to refresh the HttpOnly cookie
                await api.post(AUTH_ENDPOINTS.tokenRefresh);

                // 2. If successful, retry the original failed request
                return api(originalConfig);
            } catch (refreshError) {
                // If refresh fails, the user is truly logged out
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);
