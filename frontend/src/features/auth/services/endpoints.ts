const AUTH_ROOT = "auth";
const PASSWORD_ROOT = `${AUTH_ROOT}/password`;

const PASSWORD_DOMAIN = {
    root: PASSWORD_ROOT,
    subdomains: {
        reset: `${PASSWORD_ROOT}/reset`,
        change: `${PASSWORD_ROOT}/change`,
    },
};

const PASSWORD_ENDPOINTS = {
    passwordResetRequest: `/${PASSWORD_DOMAIN.subdomains.reset}/`,
    confirmPasswordReset: `/${PASSWORD_DOMAIN.subdomains.reset}/confirm/submit/`,
    changePassword: `/${PASSWORD_DOMAIN.subdomains.change}/`,
};

export const AUTH_ENDPOINTS = {
    root: `/${AUTH_ROOT}/`,
    login: `/${AUTH_ROOT}/login/`,
    register: `/${AUTH_ROOT}/register/`,
    logout: `/${AUTH_ROOT}/logout/`,
    activeUser: `/${AUTH_ROOT}/active_user/`,
    tokenRefresh: `/${AUTH_ROOT}/token/refresh/`,
    ...PASSWORD_ENDPOINTS
} as const;