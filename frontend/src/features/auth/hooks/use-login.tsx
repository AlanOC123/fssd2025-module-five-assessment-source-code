import { login } from "../services";
import type { LoginUserData, User } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./keys";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginUserData) => login(credentials),
        onSuccess: (user: User) => {
            queryClient.setQueryData(USER_QUERY_KEY, user)
        }
    })
}