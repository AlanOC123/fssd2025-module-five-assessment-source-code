import { AuthContext } from "../context";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
    useActiveUser,
    useLogin,
    useLogout,
    useRegister,
    useDeleteAccount,
    useRequestReset,
    useConfirmReset,
    USER_QUERY_KEY,
} from "../hooks";

import type { BaseLayoutProps } from "@/types";
import type {
    ConfirmPasswordResetPayload,
    DeleteAccountData,
    LoginUserData,
    RegisterUserData,
    RequestPasswordResetData,
} from "../types";

export const AuthProvider = ({ children }: BaseLayoutProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading } = useActiveUser();

    const loginMutation = useLogin();
    const registerMutation = useRegister();
    const logoutMutation = useLogout();
    const deleteMutation = useDeleteAccount();
    const requestResetMutation = useRequestReset();
    const confirmResetMutation = useConfirmReset();

    const clearSession = () => {
        queryClient.setQueryData(USER_QUERY_KEY, null);
        queryClient.cancelQueries();
        queryClient.clear();
        navigate("auth/login");
    };

    const handleLogin = (data: LoginUserData) => {
        loginMutation.mutate({ data }, {
            onSuccess: () => {
                toast.success("Logged in successfully...");
                navigate("/");
            },
            onError: () => {
                toast.error("Login failed");
            },
        });
    };

    const handleRegister = (data: RegisterUserData) => {
        registerMutation.mutate({ data }, {
            onSuccess: () => {
                toast.success("Registration successful! Please log in.");
                navigate("/auth/login");
            },
            onError: () => {
                toast.error("Registration failed...");
            },
        });
    };

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                clearSession();
                toast.info("Logged out");
                navigate("/auth/login");
            },
        });
    };

    const handleDelete = async (data: DeleteAccountData) => {
        return deleteMutation.mutateAsync({ data }, {
            onSuccess: () => {
                clearSession();
                toast.info("Account deleted");
            }
        })
    };

    const handleResetRequest = async (data: RequestPasswordResetData) => {
        return requestResetMutation.mutateAsync({ data }, {
            onSuccess: () => {
                toast.success("Check your email for a reset link")
            }
        })
    }

    const handleConfirmReset = async (data: ConfirmPasswordResetPayload) => {
        return confirmResetMutation.mutateAsync({ data }, {
            onSuccess: () => {
                toast.success("Password updated successfully! Please login.")
                setTimeout(() => navigate("/auth/login"), 3000)
            },

            onError: () => {
                toast.error("Failed to reset password. Try again.");
            }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isLoading,
                login: handleLogin,
                register: handleRegister,
                logout: handleLogout,
                delete: handleDelete,
                requestReset: handleResetRequest,
                confirmReset: handleConfirmReset,
                clearSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
