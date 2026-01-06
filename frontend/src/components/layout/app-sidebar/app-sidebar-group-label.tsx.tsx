import { SidebarGroupLabel } from "@/components/ui";
import { type ReactNode } from "react";

export function AppSidebarGroupLabel({ label, icon }: { label: string; icon: ReactNode }) {
    return (
        <SidebarGroupLabel className="flex items-center justify-start gap-x-2">
            {icon}
            <span>{label}</span>
        </SidebarGroupLabel>
    );
};
