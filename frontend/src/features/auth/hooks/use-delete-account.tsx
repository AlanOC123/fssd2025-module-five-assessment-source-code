import type { DeleteAccountData } from "../types";
import { USER_QUERY_KEY } from "./keys";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../services";

export function useDeleteAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: DeleteAccountData) => deleteAccount(credentials),
        onSuccess: () => {
            queryClient.setQueryData(USER_QUERY_KEY, null)
        }
    });
}
