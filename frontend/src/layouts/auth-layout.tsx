import {
    PageContainer,
    PageSection,
    PageItem,
    AuroraBackground,
    PublicOnlyRoute,
} from "@/components";
import { type BaseLayoutProps } from "@/types";
import { cn } from "@/lib";
import { Outlet } from "react-router";

export function AuthLayout({
    className,
    ...props
}: BaseLayoutProps) {
    return (
        <PublicOnlyRoute>
            <PageContainer className={cn(className)} {...props}>
                <PageSection className="place-content-center">
                    <PageItem className="relative" colspan="full">
                        <AuroraBackground className="z-0">
                            <Outlet />
                        </AuroraBackground>
                    </PageItem>
                </PageSection>
            </PageContainer>
        </PublicOnlyRoute>
    );
}