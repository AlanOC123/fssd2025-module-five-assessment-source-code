import { Routes, Route } from "react-router";
import { RegisterPage, LoginPage, HomePage, ResetPasswordPage, ConfirmPasswordResetPage } from "./pages";

function App() {
    return (
        <div className="w-full h-full">
            <Routes>
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<HomePage />} />
                <Route
                    path="/auth/password/reset"
                    element={<ResetPasswordPage />}
                />
                <Route
                    path="/auth/password/reset/confirm/:uid/:token"
                    element={<ConfirmPasswordResetPage />}
                />
            </Routes>
        </div>
    );
}

export default App;
