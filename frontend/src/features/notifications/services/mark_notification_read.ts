import { client } from "@/api";
import { NOTIFICATIONS_ENDPOINTS } from "./endpoints";

export async function markNotificationRead(id: number): Promise<void> {
    try {
        const response = await client.post(NOTIFICATIONS_ENDPOINTS.markAsRead(id), {});
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}