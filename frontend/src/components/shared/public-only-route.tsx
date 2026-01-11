import { useAuth } from "@/features";
import { type BaseLayoutProps } from "@/types";
import { Navigate, useLocation } from "react-router";
import { LoadingPage } from "../layout";
import { APP_PATHS } from "@/router";

export function PublicOnlyRoute({ children }: BaseLayoutProps) {
    const auth = useAuth()
    const location = useLocation();

    if (!auth) throw new Error("Invalid context");

    const { user, isLoading } = auth;

    if (isLoading) {
        return <LoadingPage />
    }

    if (user) {
        return <Navigate to={APP_PATHS.app.root} replace state={{ from: location }}/>
    }

    return <>{children}</>;
}