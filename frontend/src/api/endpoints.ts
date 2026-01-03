export const ENDPOINTS = {
    AUTH: {
        LOGIN: "auth/login/",
        LOGOUT: "auth/logout/",
        CURRENT_USER: "auth/users/me/",
        REGISTER: "auth/register/",
        TOKEN_REFRESH: "auth/token/refresh/",
        REQUEST_RESET: "auth/password/reset/",
        REQUEST_CONFIRM_SUBMIT: 'auth/password/reset/confirm/submit/'
    },
    PROJECTS: {
        BASE: "projects/",
        GET_BY_ID: (id: number) => `projects/${id}/`,
        TOGGLE_PIN: (id: number) => `projects/${id}/pin/`,
    }
};