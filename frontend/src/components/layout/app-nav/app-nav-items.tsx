import { Home, Boxes, Bell, Settings } from 'lucide-react';
import { type ReactNode } from 'react';

export interface NavItem {
    title: string;
    icon: ReactNode;
    href: string;
    iconColorClassName?: string;
}

export const AppNavItems: NavItem[] = [
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
