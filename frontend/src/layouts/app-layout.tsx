import { Outlet } from "react-router";
import { ProtectedRoute, AppHeader } from "@/components";
import { NotificationsSheet } from "@/features";
import { useState } from "react";

export function AppLayout() {
    const [notificationsOpen, setNotificationsOpen] = useState(false)

    return (
        <ProtectedRoute>
            <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
                {/* State is lifted here so the Header can toggle the Sheet */}
                <AppHeader
                    open={notificationsOpen}
                    onOpenNotifications={setNotificationsOpen}
                />
                <NotificationsSheet
                    open={notificationsOpen}
                    onOpenChange={setNotificationsOpen}
                />
                {/* Main Content Area */}
                <main className="flex-1 min-h-0 relative">
                    <Outlet />
                </main>
            </div>
        </ProtectedRoute>
    );
}
