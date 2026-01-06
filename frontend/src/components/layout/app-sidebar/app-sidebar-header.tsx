import type { BaseLayoutProps } from "@/types";
import { Typography } from "@/components";

export function AppSidebarHeader({ children }: BaseLayoutProps) {
    return (
        <Typography as={"h3"} variant={"h3"}>
            {children}
        </Typography>
    );
}