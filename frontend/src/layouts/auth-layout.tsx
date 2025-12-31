import {
    PageContainer,
    PageSection,
    PageItem,
    Typography,
    AuroraBackground,
} from "@/components";
import { type BaseLayoutProps } from "@/types";
import { cn } from "@/lib";

interface AuthLayoutProps extends BaseLayoutProps {
    title: string;
}

function AuthLayout({
    title,
    children,
    className,
    ...props
}: AuthLayoutProps) {
    return (
        <PageContainer className={cn(className)} {...props}>
            <PageSection className="place-content-center">
                <PageItem className="relative" colspan="full">
                    <AuroraBackground className="z-0">
                        <Typography
                            as={"h1"}
                            variant={"h1"}
                            className="text-left z-1 mb-8"
                        >
                            {title}
                        </Typography>
                        {children}
                    </AuroraBackground>
                </PageItem>
            </PageSection>
        </PageContainer>
    );
}

export { AuthLayout }