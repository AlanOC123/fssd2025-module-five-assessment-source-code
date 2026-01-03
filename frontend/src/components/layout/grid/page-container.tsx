import { cn } from "@/lib";
import { type BaseLayoutProps } from "@/types";

function PageContainer({
    children,
    className,
    ...props
}: BaseLayoutProps) {
    return (
        <main
            className={cn(
                "mx-auto grid grid-flow-row auto-rows-auto w-full h-full min-h-screen max-w-450 gap-x-1 md:gap-x-2 lg:gap-x-3 gap-y-8",
                "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
                className
            )}
            {...props}
        >
            {children}
        </main>
    );
}

export { PageContainer }