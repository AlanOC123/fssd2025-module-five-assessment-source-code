import { cn } from "@/lib";
import { type BaseLayoutProps } from "@/types";

function PageSection({
    children,
    className,
    ...props
}: BaseLayoutProps) {
    return (
        <section
            className={cn(
                "col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-subgrid auto-rows-auto grid-flow-dense overflow-x-hidden w-full",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}

export { PageSection }