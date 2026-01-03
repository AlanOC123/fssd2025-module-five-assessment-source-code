import { useContext } from "react";
import { AppContext, type AppContextType } from "@/providers";

export function useApp(): AppContextType {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("Invalid usage of App Context");
    }

    return context;
}
