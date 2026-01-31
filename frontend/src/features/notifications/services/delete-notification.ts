import { client } from "@/api";
import { NOTIFICATIONS_ENDPOINTS } from "./endpoints";

export async function deleteNotification(id: number): Promise<void> {
    try {
        const response = await client.delete<void>(NOTIFICATIONS_ENDPOINTS.detailed(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}