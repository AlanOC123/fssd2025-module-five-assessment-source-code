import { client } from "@/api";
import type { Notification } from "../types";
import { NOTIFICATIONS_ENDPOINTS } from "./endpoints";

export async function getNotifications(): Promise<Notification[]> {
    try {
        const response = await client.get<Notification[]>(NOTIFICATIONS_ENDPOINTS.list);
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}