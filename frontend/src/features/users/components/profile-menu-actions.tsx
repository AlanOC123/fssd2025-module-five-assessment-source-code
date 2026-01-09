import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    Button,
} from "@/components";
import { useAuth } from "@/features/auth";
import { EllipsisVertical } from "lucide-react";

export function ProfileMenuActions() {
    const { logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button
                        className="w-full"
                        variant={"ghost"}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
