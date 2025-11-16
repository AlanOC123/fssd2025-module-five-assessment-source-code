const API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL
const API_HOST = import.meta.env.VITE_API_HOST
const API_PORT = import.meta.env.VITE_API_PORT
const API_NAME = import.meta.env.VITE_API_NAME
const API_VERSION = import.meta.env.VITE_API_VERSION

export const API_BASE_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/${API_NAME}/v${API_VERSION}/`