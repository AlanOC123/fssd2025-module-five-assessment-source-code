const NOTIFICATIONS_ROOT = "notifications"

export const NOTIFICATIONS_ENDPOINTS = {
    list: (page: number, status: "all" | "read" | "unread") => `/${NOTIFICATIONS_ROOT}/?page=${page}${(status && status !== "all" ? `&status=${status}` : "")}`,
    detailed: (id: number) => `/${NOTIFICATIONS_ROOT}/${id}/`,
    markAsRead: (id: number) => `/${NOTIFICATIONS_ROOT}/${id}/mark_read/`,
    markAllRead: () => `/${NOTIFICATIONS_ROOT}/mark_all_read/`
}