import { SidebarGroupContent } from "@/components/ui";
import type { BaseLayoutProps } from "@/types";

export function AppSidebarContent({ children }: BaseLayoutProps) {
    return (
        <SidebarGroupContent>
            {children}
        </SidebarGroupContent>
    )
}