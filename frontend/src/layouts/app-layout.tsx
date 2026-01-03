import type { BaseLayoutProps } from "@/types";

export function AppLayout({ children }: BaseLayoutProps) {
    return (
        <div className="flex gap-4 h-screen w-screen overflow-hidden relative">
            {children}
        </div>
    );
}
