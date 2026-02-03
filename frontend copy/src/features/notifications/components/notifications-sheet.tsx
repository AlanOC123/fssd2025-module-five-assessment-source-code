import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components";
import {
    Bell,
    CheckCheck,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router";
import { UserAvatar } from "@/features/users";
import { useNotifications } from "../hooks";
import type { NotificationItem, NotificationsSheetProps } from "../types";
import { APP_PATHS } from "@/router";

export function NotificationsSheet({ open, onOpenChange }: NotificationsSheetProps) {
    const navigate = useNavigate();
    const {
        notifications,
        isLoading,
        markRead,
        markAllRead,
        page,
        setPage,
        updateStatus,
        status,
        hasNextPage,
        hasPrevPage,
        totalCount,
    } = useNotifications();

    const handleNotificationClick = (notification: NotificationItem) => {
        if (!notification.is_read) {
            markRead(notification.id);
        }

        // Navigation Logic
        if (notification.project_id) {
            navigate(APP_PATHS.app.project(notification.project_id));
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full p-0">
                {/* Header Section */}
                <SheetHeader className="p-6 pb-2 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <SheetTitle className="text-xl">
                            Notifications
                        </SheetTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground hover:text-primary"
                            onClick={() => markAllRead()}
                            disabled={isLoading}
                        >
                            <CheckCheck className="w-3 h-3 mr-1" />
                            Mark all read
                        </Button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        {(["all", "unread", "read"] as const).map((tab) => (
                            <Button
                                key={tab}
                                variant={status === tab ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => updateStatus(tab)}
                                className="capitalize h-7 text-xs rounded-full px-4"
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                </SheetHeader>

                {/* List Section */}
                <div className="flex-1 overflow-y-auto p-0">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                            <Bell className="w-8 h-8 mb-2 opacity-20" />
                            <p className="text-sm">No notifications found</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() =>
                                        handleNotificationClick(item)
                                    }
                                    className={`
                                        flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-muted/40
                                        ${!item.is_read ? "bg-blue-50/40 dark:bg-blue-900/10" : ""}
                                    `}
                                >
                                    <UserAvatar
                                        src={item.actor_avatar || undefined}
                                        // Fallback initials if needed, though your API handles it well
                                        firstName={
                                            item.actor_name.split(" ")[0]
                                        }
                                        className="h-9 w-9 mt-1 border"
                                    />

                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm leading-snug text-foreground">
                                            <span className="font-semibold text-foreground/90">
                                                {item.actor_name}
                                            </span>{" "}
                                            {item.message}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>
                                                {formatDistanceToNow(
                                                    new Date(item.created_at),
                                                    { addSuffix: true },
                                                )}
                                            </span>
                                            {item.project_title && (
                                                <>
                                                    <span>•</span>
                                                    <span className="font-medium text-primary/80 truncate max-w-[150px]">
                                                        {item.project_title}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {!item.is_read && (
                                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer / Pagination Section */}
                <div className="p-4 border-t bg-muted/5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        Page {page} • Total {totalCount}
                    </span>
                    <div className="flex gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={!hasPrevPage || isLoading}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!hasNextPage || isLoading}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
