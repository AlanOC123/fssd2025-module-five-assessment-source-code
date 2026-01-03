import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("Invalid usage of Auth Context.")
    }

    return context;
}