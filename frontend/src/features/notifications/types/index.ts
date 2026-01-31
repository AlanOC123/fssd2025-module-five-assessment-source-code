import type { UserProfile } from "@/features/users";

export interface NotificationData {
    project_id?: number;
    project_title?: number;

    invite_id?: number;
    status?: string;

    task_id?: number;
    task_title?: string;

    preview: string;
}

export interface Notification {
    id: number;
    notification_type: "new_comment" | "project_invite" | "task_assigned";
    actor_detail: UserProfile;
    is_read: boolean;
    created_at: string;
    notification_data: NotificationData;
}

export interface RespondToInviteProps {
    projectId: number;
    accept: boolean;
}

export interface InvitationResponse {
    detail?: string;
    status?: number;
    message?: string;
}
