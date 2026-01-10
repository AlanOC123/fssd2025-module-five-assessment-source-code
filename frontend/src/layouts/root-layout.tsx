import { AuthProvider } from "@/features";
import { ThemeProvider } from "@/providers";
import { Toaster } from "sonner";
import { Outlet } from "react-router";

export function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Outlet />
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    )
}