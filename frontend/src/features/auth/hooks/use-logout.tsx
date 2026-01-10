import { logout } from "../services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./keys";

export function useLogout() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: () => logout(),

        onSuccess: () => {
            queryClient.setQueryData(USER_QUERY_KEY, null);
            queryClient.clear()
            sessionStorage.clear()
        }
    })
}