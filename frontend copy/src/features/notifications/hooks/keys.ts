import type { GetNotificationRequest } from "../types";

export const NOTIFICATION_KEYS = {
    all: ["notifications"] as const,
    list: ({ page, status }: GetNotificationRequest) => ["notifications", "list", page, status] as const,
};
