import { ProtectedRoute, Button } from "@/components";
import { useAuth } from "@/features";

export function HomePage() {
    const auth = useAuth();

    if (!auth) {
        throw new Error("Invalid auth context...")
    }

    const { logout } = auth;

    return (
        <ProtectedRoute>
            <div className="h-screen w-screen flex items-center justify-center">
                <Button variant={"destructive"} onClick={logout}>Logout</Button>
            </div>
        </ProtectedRoute>
    )
}