import { cn } from "@/lib";

export function MobileNavItem({ icon, label, isActive, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors",
                isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
            )}
        >
            <div
                className={cn(
                    "p-1.5 rounded-full transition-all",
                    isActive && "bg-primary/10",
                )}
            >
                {icon}
            </div>
            <span>{label}</span>
        </button>
    );
}