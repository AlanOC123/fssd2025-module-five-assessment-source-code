import { Outlet } from "react-router";
import { AuroraBackground, PublicOnlyRoute } from "@/components";
import { type BaseLayoutProps } from "@/types";
import { cn } from "@/lib";

export function AuthLayout({ className }: BaseLayoutProps) {
    return (
        <PublicOnlyRoute>
            <div className={cn("h-screen w-screen overflow-hidden", className)}>
                <AuroraBackground>
                    <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
                        <Outlet />
                    </div>
                </AuroraBackground>
            </div>
        </PublicOnlyRoute>
    );
}
