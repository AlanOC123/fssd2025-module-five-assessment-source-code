import { useNotifications, NotificationItem } from "@/features";
import { Loader2, BellOff } from "lucide-react";

export function InboxPage() {
    const { data: notifications, isLoading } = useNotifications();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!notifications || notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                <div className="bg-muted/50 p-4 rounded-full mb-4">
                    <BellOff className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium">All caught up!</h3>
                <p>You have no new notifications.</p>
            </div>
        );
    }

    // Separate Invites (Priority) from standard alerts
    const invites = notifications.filter(
        (n) => n.notification_type === "project_invite",
    );

    const general = notifications.filter(
        (n) => n.notification_type !== "project_invite",
    );

    return (
        <div className="container max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Inbox</h1>

            {/* 1. Priority Section: Project Invites */}
            {invites.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Pending Invites
                    </h2>
                    <div className="space-y-3">
                        {invites.map((note) => (
                            <NotificationItem
                                key={note.id}
                                notification={note}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 2. General Activity Stream */}
            <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Activity
                </h2>
                <div className="bg-card border rounded-lg divide-y">
                    {general.length > 0 ? (
                        general.map((note) => (
                            <NotificationItem
                                key={note.id}
                                notification={note}
                            />
                        ))
                    ) : (
                        <div className="p-4 text-sm text-muted-foreground text-center">
                            No recent activity
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
