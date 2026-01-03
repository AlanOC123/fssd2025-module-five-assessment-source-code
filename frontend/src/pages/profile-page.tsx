import { Button } from "@/components";
import { useAuth } from "@/features";

export function ProfilePage() {
    const { logout } = useAuth();

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Button variant={"destructive"} onClick={logout}>
                Logout
            </Button>
        </div>
    );
}
