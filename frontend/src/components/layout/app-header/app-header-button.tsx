import { Button } from "@/components/ui";
import { cn } from "@/lib";
import type { ReactNode } from "react";

export function AppHeaderButton({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick?: () => void;
}) {
    return (
        <Button
            size={"icon"}
            onClick={onClick}
            className={cn("size-7")}
            variant={"ghost"}
        >
            {children}
        </Button>
    );
}
