import { cn } from "@/lib";
import { type BaseLayoutProps } from "@/types";

export type ColSpanKey = "full" | "threeQuarters" | "half" | "third" | "quarter"; 

interface PageItemProps extends BaseLayoutProps {
    colspan?: ColSpanKey,
}

const SPAN_CLASSES: Record<ColSpanKey, string> = {
    full: "col-span-4 md:col-span-8 lg:col-span-12",
    threeQuarters: "col-span-4 md:col-span-8 lg:col-span-8",
    half: "col-span-4 md:col-span-4 lg:col-span-6",
    third: "col-span-4 md:col-span-4 lg:col-span-4",
    quarter: "col-span-2 md:col-span-2 lg:col-span-3",
};

function PageItem({ children, className, colspan = "full", ...props }: PageItemProps) {
    const colSpanClass = SPAN_CLASSES[colspan]

    return (
        <div className={cn(className, colSpanClass)} {...props}>
            {children}
        </div>
    )
}

export { PageItem }