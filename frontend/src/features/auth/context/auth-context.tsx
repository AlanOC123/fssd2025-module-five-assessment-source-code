import { createContext  } from "react";
import { type User } from "@/types";
import type { LoginFormData, RegisterFormData } from "../components";

export interface AuthContextType {
    user: User | null,
    isLoading: boolean,
    login: (credentials: LoginFormData) => void
    register: (submission: RegisterFormData) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AUTH_KEYS = {
    USER: ["user", "auth"] as const
}