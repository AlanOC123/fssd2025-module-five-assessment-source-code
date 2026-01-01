import { useAuth } from "@/features";
import { useLocation, Navigate } from "react-router";
import { type BaseLayoutProps } from "@/types";
import { LoadingPage } from "../layout";

export function ProtectedRoute({ children }: BaseLayoutProps) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth) {
        throw new Error("Invalid context")
    }

    const { user, isLoading } = auth;

    if (isLoading) {
        return <LoadingPage />
    }

    if (!user) {
        return <Navigate to={"/login"} replace state={{ from: location }} />
    }

    return children
}