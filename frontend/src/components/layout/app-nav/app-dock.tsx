import { FloatingDock } from "@/components/ui";
import { type NavItem } from "./app-nav-items";

export function AppDock({ navItems }: { navItems: NavItem[] }) {
    return (
        <FloatingDock
            desktopClassName="bottom-2 left-1/2 trans bg-card/40 backdrop-blur-md shadow-lg border"
            items={navItems}
        />
    );
}
