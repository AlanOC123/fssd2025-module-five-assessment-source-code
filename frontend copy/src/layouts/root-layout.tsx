import { Outlet } from "react-router";
import { AuthProvider } from "@/features";
import { Toaster } from "@/components/ui/sonner";

export function RootLayout() {
    return (
        <AuthProvider>
            <Outlet />
            <Toaster position="bottom-right" />
        </AuthProvider>
    );
}
