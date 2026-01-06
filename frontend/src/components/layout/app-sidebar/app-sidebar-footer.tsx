import { SidebarFooter } from "@/components/ui";
import type { BaseLayoutProps } from "@/types";

export function AppSidebarFooter({ children }: BaseLayoutProps) {
    return (
        <SidebarFooter>
            {children}
        </SidebarFooter>
    )
}