export type NotificationType =
    | "project_invite"
    | "invite_accepted"
    | "invite_rejected"
    | "project_completed"
    | "task_overdue"
    | "removed";

export interface NotificationItem {
    id: number;
    notification_type: NotificationType;
    message: string;
    is_read: boolean;
    created_at: string;

    project_id?: number;
    project_title?: string;
    actor_name: string;
    actor_avatar?: string | null;
}

export interface PaginatedNotifications {
    count: number;
    next: string | null;
    previous: string | null;
    results: NotificationItem[];
}

export type NotificationRequestStatus = "all" | "read" | "unread";

export interface GetNotificationRequest {
    page: number;
    status: NotificationRequestStatus
}

export interface NotificationsSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}