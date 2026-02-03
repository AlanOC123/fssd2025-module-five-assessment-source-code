import { login } from "../services";
import type { LoginRequest } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AUTH_KEYS } from "./keys";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data }: LoginRequest) => login({ data }),

        onSuccess: (data) => {
            queryClient.setQueryData(AUTH_KEYS.user(), data.user)
        }
    })
}