import { Routes, Route } from "react-router";
import {
    RegisterPage,
    LoginPage,
    HomePage,
    ResetPasswordPage,
    ConfirmPasswordResetPage,
    ProfilePage,
    ProjectsPage,
    SettingsPage,
    InboxPage,
} from "./pages";
import { AuthLayout, AppLayout } from "./layouts";
import { ThemeProvider } from "./providers";
import { Toaster } from "@/components/ui";

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="auth/login" element={<LoginPage />} />
                    <Route
                        path="/auth/password/reset"
                        element={<ResetPasswordPage />}
                    />
                    <Route
                        path="/auth/password/reset/confirm/:uid/:token"
                        element={<ConfirmPasswordResetPage />}
                    />
                </Route>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/inbox" element={<InboxPage />} />
                </Route>
            </Routes>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
