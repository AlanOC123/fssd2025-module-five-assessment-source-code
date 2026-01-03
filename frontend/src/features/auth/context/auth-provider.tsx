import { AuthContext, AUTH_KEYS } from "./auth-context";
import { type BaseLayoutProps } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { postLogin, postRegister, postLogout, getCurrentUser } from "../api";
import { registerCallback } from "@/api";
import { useEffect } from "react";
import { toast } from "sonner";

export const AuthProvider = ({ children }: BaseLayoutProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, isLoading } = useQuery({
        queryKey: AUTH_KEYS.USER,
        queryFn: getCurrentUser,
        retry: false,
        staleTime: Infinity,
    });

    const loginMutation = useMutation({
        mutationFn: postLogin,
        onSuccess: (newUser) => {
            queryClient.setQueryData(AUTH_KEYS.USER, newUser);
            toast.success(`Logged in successfully...`);
            navigate("/");
        },
        onError: (err) => {
            const { response } = err;
            const { data } = response;
            console.log(data["non_field_errors"]);

            if (data["non_field_errors"]) {
                const errors: string[] = data["non_field_errors"];

                errors.forEach((error) => toast.error(error));
                return;
            }

            console.error(`Error logging in. Error: ${err}`);
            toast.error(`Error logging in. Error: ${err}`);
        },
    });

    const registerMutation = useMutation({
        mutationFn: postRegister,
        onSuccess: (newUser) => {
            console.log(newUser);
            queryClient.setQueryData(AUTH_KEYS.USER, newUser);
            navigate("/auth/login");
        },
        onError: (err) => {
            const { response } = err;
            const { data } = response;
            console.log(data["non_field_errors"]);

            if (data["non_field_errors"]) {
                const errors: string[] = data["non_field_errors"];

                errors.forEach((error) => toast.error(error));
                return;
            }

            console.error(`Error registering user. Error: ${err}`);
            toast.error(`Error registering user. Error: ${err}`);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: postLogout,
        onSuccess: () => {
            queryClient.setQueryData(AUTH_KEYS.USER, null);
            queryClient.clear();
            navigate("/auth/login");
            toast.info(`Logged out successfully...`);
        },
        onError: (err) => {
            const { response } = err;
            const { data } = response;
            console.log(data["non_field_errors"]);

            if (data["non_field_errors"]) {
                const errors: string[] = data["non_field_errors"];

                errors.forEach((error) => toast.error(error));
                return;
            }

            console.error(`Error logging out. Error: ${err}`);
            toast.error(`Error logging out. Error: ${err}`);
        },
    });

    useEffect(() => {
        registerCallback(() => {
            queryClient.setQueryData(AUTH_KEYS.USER, null);
            queryClient.clear();
            navigate("/auth/login");
        });
    }, [navigate, queryClient]);

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isLoading,
                login: loginMutation.mutate,
                register: registerMutation.mutate,
                logout: logoutMutation.mutate,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
