import { login } from "../services";
import type { LoginMutationProps, User } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./keys";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data }: LoginMutationProps) => login(data),

        onSuccess: (user: User) => {
            queryClient.setQueryData(USER_QUERY_KEY, user)
        }
    })
}