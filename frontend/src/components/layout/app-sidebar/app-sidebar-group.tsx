import { SidebarGroup, SidebarGroupContent } from "@/components/ui";
import type { ReactNode } from "react";


export function AppSidebarGroup({ children }: { children: ReactNode }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex items-center gap-x-4 justify-center">
                { children }
            </SidebarGroupContent>
        </SidebarGroup>
    );
}