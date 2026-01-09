import { FloatingDock } from "@/components/ui";
import { type NavItem } from "./app-nav-items";

export function AppDock({ navItems }: { navItems: NavItem[] }) {
    return (
        <FloatingDock
            desktopClassName="bottom-4 border"
            items={navItems}
        />
    );
}
