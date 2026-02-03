import { useContext } from "react";
import { AuthContext } from "../context";
import type { AuthContextType } from "../types";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("Invalid usage of Auth Context.")
    }

    return context;
}