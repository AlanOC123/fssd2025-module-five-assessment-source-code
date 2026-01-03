import type { ReactNode } from "react";
import { AppContext } from "./app-context";
import { useLocation } from "react-router";

export function AppProvider({ children }: { children: ReactNode }) {
    const location = useLocation();

    const currPath = location.pathname;

    return (
        <AppContext.Provider value={{ currPath }}>
            {children}
        </AppContext.Provider>
    );
}