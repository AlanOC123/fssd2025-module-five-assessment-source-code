import { useApp } from "@/hooks";
import { AppDock, AppNavItems } from "@/components";
import { cn } from "@/lib";

export function AppNav() {
    const { currPath, isDockOpen } = useApp();

    AppNavItems.forEach((item) => {
        if (item.href === currPath) {
            item.iconColorClassName =
                "dark:bg-foreground bg-background text-accent dark:text-accent border border-accent";
        } else {
            item.iconColorClassName = "";
        }
    });

    return (
        <nav
            className={cn(isDockOpen ? "h-auto" : "h-0",
                "p-2 w-screen fixed bottom-0 flex justify-start lg:justify-center"
            )}
        >
            <AppDock navItems={AppNavItems} />
        </nav>
    );
}
