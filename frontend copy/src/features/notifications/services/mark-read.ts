import { client } from "@/api";
import { NOTIFICATIONS_ENDPOINTS } from "./endpoints";

export const markNotificationRead = async (id: number) => {
    try {
        const response = await client.post(NOTIFICATIONS_ENDPOINTS.markAsRead(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const markAllNotificationsRead = async () => {
    try {
        const response = await client.post(NOTIFICATIONS_ENDPOINTS.markAllRead(), {});
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
