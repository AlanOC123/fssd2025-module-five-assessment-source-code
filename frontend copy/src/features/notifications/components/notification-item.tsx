import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import { UserAvatar } from "@/features/users"; // <--- Usage
import type { Notification } from "../types";
import { InviteCard } from "./invite-card";

export function NotificationItem({
    notification,
}: {
    notification: Notification;
}) {
    const navigate = useNavigate();
    const { actor_detail, notification_data, created_at } = notification;

    if (notification.notification_type === "project_invite") {
        return <InviteCard notification={notification} />;
    }

    if (notification.notification_type === "new_comment") {
        return (
            <div
                onClick={() =>
                    navigate(
                        `/projects/${notification_data.project_id}?tab=discussions`,
                    )
                }
                className="p-4 flex gap-4 hover:bg-muted/40 cursor-pointer transition-colors"
            >
                <div className="mt-1">
                    <UserAvatar
                        src={actor_detail.avatar}
                        firstName={actor_detail.first_name}
                        lastName={actor_detail.last_name}
                    />
                </div>

                <div className="flex-1 space-y-1">
                    <p className="text-sm text-foreground">
                        <span className="font-semibold">
                            {actor_detail.first_name} {actor_detail.last_name}
                        </span>{" "}
                        commented on{" "}
                        <span className="font-medium text-primary">
                            {notification_data.project_title}
                        </span>
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        "{notification_data.preview}"
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                        {formatDistanceToNow(new Date(created_at), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
