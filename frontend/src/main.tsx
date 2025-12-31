import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import '@fontsource/inter/100.css';
import '@fontsource/inter/100-italic.css';
import '@fontsource/inter/200.css';
import "@fontsource/inter/200-italic.css";
import '@fontsource/inter/300.css';
import "@fontsource/inter/300-italic.css";
import '@fontsource/inter/400.css';
import "@fontsource/inter/400-italic.css";
import '@fontsource/inter/500.css';
import "@fontsource/inter/500-italic.css";
import '@fontsource/inter/600.css';
import "@fontsource/inter/600-italic.css";
import '@fontsource/inter/700.css';
import "@fontsource/inter/700-italic.css";
import '@fontsource/inter/800.css';
import "@fontsource/inter/800-italic.css";
import '@fontsource/inter/900.css';
import "@fontsource/inter/900-italic.css";

import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
