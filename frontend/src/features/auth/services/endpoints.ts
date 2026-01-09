const ROOT_DOMAIN = "auth"

export const LOGIN = `/${ROOT_DOMAIN}/login/`;
export const REGISTER = `/${ROOT_DOMAIN}/register/`;
export const LOGOUT = `/${ROOT_DOMAIN}/logout/`;
export const ACTIVE_USER = `/${ROOT_DOMAIN}/active_user/`;
export const TOKEN_REFRESH = `/${ROOT_DOMAIN}/token/refresh/`;

const PASSWORD_SUBDOMAIN = `/${ROOT_DOMAIN}/password`;
const PASSWORD_RESET_SUBDOMAIN = `${PASSWORD_SUBDOMAIN}/reset/`

export const PASSWORD_RESET_REQUEST = `${PASSWORD_RESET_SUBDOMAIN}`;
export const PASSWORD_RESET_CONFIRM = `${PASSWORD_RESET_SUBDOMAIN}/confirm/`;