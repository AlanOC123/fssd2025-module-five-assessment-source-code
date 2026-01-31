const NOTIFICATIONS_ROOT = "notifications"

export const NOTIFICATIONS_ENDPOINTS = {
    list: `/${NOTIFICATIONS_ROOT}/`,
    detailed: (id: number) => `/${NOTIFICATIONS_ROOT}/${id}/`,
    markAsRead: (id: number) => `/${NOTIFICATIONS_ROOT}/${id}/mark_as_read/`
}