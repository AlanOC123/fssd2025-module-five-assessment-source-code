export const CHAT_ROOT = "chat";

export const CHAT_ENDPOINTS = {
    list: `/${CHAT_ROOT}/`,
    detail: (id: number) => `/${CHAT_ROOT}/${id}/`,
    react: (id: number) => `/${CHAT_ROOT}/${id}/react/`,
};
