import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    keepPreviousData,
} from "@tanstack/react-query";
import { getNotifications } from "../services";
import { markNotificationRead, markAllNotificationsRead } from "../services";

import type { NotificationRequestStatus } from "../types";

import { NOTIFICATION_KEYS } from "./keys";

export function useNotifications() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<NotificationRequestStatus>("all");

    const { data, isLoading, isPlaceholderData } = useQuery({
        queryKey: NOTIFICATION_KEYS.list({ page, status }),
        queryFn: () => getNotifications({ page, status }),
        placeholderData: keepPreviousData,
        refetchInterval: 30000,
    });

    const updateStatus = (newStatus: NotificationRequestStatus) => {
        setStatus(newStatus);
        setPage(1);
    };

    const notifications = data?.results ?? [];
    const totalCount = data?.count ?? 0;
    const hasNextPage = !!data?.next;
    const hasPrevPage = !!data?.previous;
    const unreadCount = notifications.filter((n) => !n.is_read).length;

    const { mutate: markRead } = useMutation({
        mutationFn: markNotificationRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: NOTIFICATION_KEYS.list({ page, status }),
            });
        },
    });

    const { mutate: markAllRead } = useMutation({
        mutationFn: markAllNotificationsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });

    return {
        notifications,
        isLoading,
        unreadCount,
        markRead,
        markAllRead,
        page,
        setPage,
        updateStatus,
        status,
        hasNextPage,
        hasPrevPage,
        isPlaceholderData,
        totalCount,
    };
}
