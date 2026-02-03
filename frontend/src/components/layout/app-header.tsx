import { Bell, Moon, Sun, Monitor } from "lucide-react";
import { useGetActiveUserProfile, UserAvatar } from "@/features";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";
import { useTheme } from "@/hooks";

import { APP_PATHS } from "@/router";
import { useLogout } from "@/features";
import { useNotifications } from "@/features";

import { useNavigate } from "react-router";

interface AppHeaderProps {
    open: boolean;
    onOpenNotifications: (open: boolean) => void;
}

export function AppHeader({ open, onOpenNotifications }: AppHeaderProps) {
    const { data: user } = useGetActiveUserProfile();
    const { setTheme } = useTheme();
    const { unreadCount } = useNotifications();
    const navigate = useNavigate();
    const { mutate: logout } = useLogout();

    return (
        <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0 z-50">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">
                        P
                    </span>
                </div>
                <span className="font-bold text-xl tracking-tight">
                    Projectly
                </span>
            </div>

            {/* Action Buttons Section */}
            <div className="flex items-center gap-3">
                {/* 1. Notifications Button (Moved from workspace) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => onOpenNotifications(!open)}
                >
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background animate-in zoom-in" />
                    )}
                </Button>

                {/* 2. Theme Selector */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" /> Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" /> Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="mr-2 h-4 w-4" /> System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* 3. Profile Picture */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="outline-none focus:ring-2 focus:ring-primary rounded-full ml-1">
                            <UserAvatar
                                src={user?.avatar}
                                firstName={user?.first_name}
                                lastName={user?.last_name}
                                className="h-9 w-9"
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5 text-sm font-medium border-b mb-1">
                            {user?.first_name} {user?.last_name}
                        </div>
                        <DropdownMenuItem onClick={() => navigate(APP_PATHS.app.settings)}>Profile Settings</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
