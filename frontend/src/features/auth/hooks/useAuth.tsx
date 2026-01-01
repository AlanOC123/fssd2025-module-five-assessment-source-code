import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context";

export const useAuth = (): AuthContextType | undefined => {
    const context = useContext(AuthContext);

    if (!context) {
        console.error("Component must be wrapped in an Auth Context to be used");
        return undefined;
    }

    return context
}