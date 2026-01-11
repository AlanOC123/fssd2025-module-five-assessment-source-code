import { createBrowserRouter, Navigate } from "react-router";

import { AuthLayout, AppLayout, RootLayout } from "./layouts";
import { LoginPage, RegisterPage, ResetPasswordPage, ConfirmPasswordResetPage } from "./pages";
import { HomePage, ProjectsPage, InboxPage, SettingsPage, ProjectDetailsPage } from "./pages";

const AUTH_ROOT = "auth";
const PASSWORD_ROOT = `${AUTH_ROOT}/password`;

export const APP_PATHS = {
    auth: {
        root: `/${AUTH_ROOT}/`,
        login: `/${AUTH_ROOT}/login`,
        register: `/${AUTH_ROOT}/register`,
        passwordReset: `/${PASSWORD_ROOT}/reset`,
    },

    app: {
        root: "/",
        projects: "/projects",
        inbox: "/inbox",
        settings: "/settings",
    },

    utils: {
        confirmPasswordReset: (uid: string, token: string) => 
            `/${PASSWORD_ROOT}/reset/confirm/${uid}/${token}`,
            
        projectDetails: (projectId: number) => 
            `/projects/${projectId?.toString()}`,
    }
};

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: AUTH_ROOT,
                element: <AuthLayout />,
                children: [
                    { index: true, element: <Navigate to={"login"} replace /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                    { path: "password/reset", element: <ResetPasswordPage /> },
                    { path: "password/reset/confirm/:uid/:token", element: <ConfirmPasswordResetPage /> },
                ]
            },

            {
                path: "/",
                element: <AppLayout />,
                children: [
                    { index: true, element: <HomePage /> },

                    { path: "projects", element: <ProjectsPage /> },
                    { path: "projects/:projectId", element: <ProjectDetailsPage /> },

                    { path: "inbox", element: <InboxPage /> },
                    { path: "settings", element: <SettingsPage /> }
                ]
            },

            { path: "*", element: <Navigate to={"/"} replace /> }
        ]
    }
])