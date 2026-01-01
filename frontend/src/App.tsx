import { Routes, Route } from "react-router";
import { RegisterPage, LoginPage } from "./pages";

function App() {
    return (
        <div className="w-full h-full">
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
