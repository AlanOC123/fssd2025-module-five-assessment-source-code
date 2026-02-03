import { logout } from "../services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AUTH_KEYS } from "./keys";

export function useLogout() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: () => logout(),

        onSuccess: () => {
            queryClient.setQueryData(AUTH_KEYS.user(), null);
            queryClient.clear()
            sessionStorage.clear()
        }
    })
}