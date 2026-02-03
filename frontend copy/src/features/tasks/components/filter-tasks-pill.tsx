import { cn } from "@/lib";
import type { FilterTasksPillProps } from "../types";

export function FilterTasksPill({
    label,
    isActive,
    onClick,
}: FilterTasksPillProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
        >
            {label}
        </button>
    );
}
