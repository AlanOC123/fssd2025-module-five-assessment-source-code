const ROOT_DOMAIN = "auth"

export const LOGIN_ROUTE = `/${ROOT_DOMAIN}/login/`;
export const REGISTER_ROUTE = `/${ROOT_DOMAIN}/register/`;
export const LOGOUT_ROUTE = `/${ROOT_DOMAIN}/logout/`;
export const ACTIVE_USER_ROUTE = `/${ROOT_DOMAIN}/active_user/`;
export const TOKEN_REFRESH_ROUTE = `/${ROOT_DOMAIN}/token/refresh/`;

const PASSWORD_SUBDOMAIN = `/${ROOT_DOMAIN}/password`;
const PASSWORD_RESET_SUBDOMAIN = `${PASSWORD_SUBDOMAIN}/reset`

export const PASSWORD_RESET_REQUEST_ROUTE = `${PASSWORD_RESET_SUBDOMAIN}`;
export const PASSWORD_RESET_CONFIRM_ROUTE = `${PASSWORD_RESET_SUBDOMAIN}/confirm/submit/`;
export const CHANGE_PASSWORD_ROUTE = `${PASSWORD_SUBDOMAIN}/change/`;