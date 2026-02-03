import { client } from "@/api";
import type { PaginatedNotifications, GetNotificationRequest } from "../types";
import { NOTIFICATIONS_ENDPOINTS } from "./endpoints";

export const getNotifications = async ({
    page = 1,
    status = "all"
}: GetNotificationRequest): Promise<PaginatedNotifications> => {
    try {
        const response = await client.get<PaginatedNotifications>(
            NOTIFICATIONS_ENDPOINTS.list(page, status),
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err
    }
};
