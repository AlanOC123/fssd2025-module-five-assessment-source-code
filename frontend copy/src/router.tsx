import { createBrowserRouter, Navigate } from "react-router";
import { RootLayout } from "./layouts"; // Import the layout above
import { AuthLayout, AppLayout } from "./layouts";
import {
    HomePage,
    ProjectWorkspacePage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    ConfirmPasswordResetPage,
} from "@/pages";

const AUTH_ROOT = "auth";

const PASSWORD_ROOT = `${AUTH_ROOT}/password`;

export const APP_PATHS = {
    auth: {
        login: `/${AUTH_ROOT}/login`,

        register: `/${AUTH_ROOT}/register`,

        passwordReset: `/${PASSWORD_ROOT}/reset`,

        logout: `/${AUTH_ROOT}/logout/`
    },

    app: {
        root: "/",

        settings: "/settings",

        project: (id: number) => `/projects/${id}`,
    },
};

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
                    { index: true, element: <Navigate to="login" replace /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                    { path: "password/reset", element: <ResetPasswordPage /> },
                    {
                        path: "password/reset/confirm/:uid/:token",
                        element: <ConfirmPasswordResetPage />,
                    },
                ],
            },
            {
                path: "/",
                element: <AppLayout />,
                children: [
                    { index: true, element: <HomePage /> },
                    {
                        path: "projects/:projectId",
                        element: <ProjectWorkspacePage />,
                    },
                    { path: "settings", element: <SettingsPage /> },
                ],
            },
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);
