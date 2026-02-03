import type { DeleteAccountRequest } from "../types";
import { AUTH_KEYS } from "./keys";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../services";

export function useDeleteAccount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data }: DeleteAccountRequest) => deleteAccount({ data }),
        onSuccess: () => {
            queryClient.setQueryData(AUTH_KEYS.user(), null)
        }
    });
}
