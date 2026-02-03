import { Outlet } from "react-router";
import { AuthProvider } from "@/features";
import { Toaster } from "@/components/ui/sonner";

export function RootLayout() {
    return (
        // The AuthProvider initializes the user session on first load
        <AuthProvider>
            <Outlet /> {/* Renders the child route (App or Auth) */}
            <Toaster position="bottom-right" />
        </AuthProvider>
    );
}
