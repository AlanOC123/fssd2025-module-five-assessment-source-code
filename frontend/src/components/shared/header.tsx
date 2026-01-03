import { Home, Boxes, Bell, Settings } from "lucide-react";
import { type ReactNode } from "react";
import { FloatingDock } from "../ui";
import { useApp } from "@/hooks";

interface NavItem {
    title: string;
    icon: ReactNode;
    href: string;
    iconColorClassName?: string;
}

const NAV_ITEMS: NavItem[] = [
    {
        title: "Home",
        icon: <Home className="w-full h-full rounded-full" />,
        href: "/",
        iconColorClassName: "",
    },
    {
        title: "Projects",
        icon: <Boxes className="w-full h-full rounded-full" />,
        href: "/projects",
        iconColorClassName: "",
    },
    {
        title: "Inbox",
        icon: <Bell className="w-full h-full rounded-full" />,
        href: "/inbox",
        iconColorClassName: "",
    },
    {
        title: "Settings",
        icon: <Settings className="w-full h-full rounded-full" />,
        href: "/settings",
        iconColorClassName: "",
    },
];

export function Header() {
    const { currPath } = useApp();

    NAV_ITEMS.forEach(item => {
        if (item.href === currPath) {
            console.log(item.href);
            console.log(currPath);
            item.iconColorClassName = "dark:bg-foreground bg-background text-accent dark:text-accent border border-accent";
        } else {
            item.iconColorClassName = "";
        }
    })

    return (
        <header className="w-screen fixed bottom-0 flex justify-start lg:justify-center">
            <nav className="px-2 pb-2">
                <FloatingDock
                    desktopClassName="bottom-2 left-1/2 trans bg-card/40 backdrop-blur-md shadow-lg border"
                    items={NAV_ITEMS}
                />
            </nav>
        </header>
    );
}