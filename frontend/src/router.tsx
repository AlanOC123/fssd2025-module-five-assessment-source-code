import { createBrowserRouter, Navigate } from "react-router";

import { AuthLayout, AppLayout, RootLayout } from "./layouts";
import { LoginPage, RegisterPage, ResetPasswordPage, ConfirmPasswordResetPage } from "./pages";
import { HomePage, ProjectsPage, InboxPage, SettingsPage, ProjectDetailsPage } from "./pages";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "auth",
                element: <AuthLayout />,
                children: [
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

                    { path: "/projects", element: <ProjectsPage /> },
                    { path: "/projects/:projectId", element: <ProjectDetailsPage /> },

                    { path: "inbox", element: <InboxPage /> },
                    { path: "settings", element: <SettingsPage /> }
                ]
            },

            { path: "*", element: <Navigate to={"/"} replace /> }
        ]
    }
])