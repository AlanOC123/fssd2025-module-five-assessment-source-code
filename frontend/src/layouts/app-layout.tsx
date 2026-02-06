import { Outlet } from "react-router";
import { ProtectedRoute, AppHeader, AppFooter } from "@/components";
import { NotificationsSheet } from "@/features";
import { useState } from "react";

export function AppLayout() {
    const [notificationsOpen, setNotificationsOpen] = useState(false);

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
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    <div className="flex flex-col min-h-full">
                        {/* Page Content */}
                        <div className="flex-1 h-full flex flex-col">
                            <Outlet />
                        </div>
                        <div className="pb-24 md:pb-0">
                            <AppFooter />
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
