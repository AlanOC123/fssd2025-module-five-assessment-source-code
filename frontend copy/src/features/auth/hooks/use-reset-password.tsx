import { requestPasswordReset, confirmPasswordReset } from "../services";
import { useMutation } from "@tanstack/react-query";
import type { RequestPasswordResetRequest, ConfirmPasswordResetRequest} from "../types";

export function useRequestReset() {
    return useMutation({
        mutationFn: ({ data }: RequestPasswordResetRequest) => requestPasswordReset({ data })
    })
}

export function useConfirmReset() {
    return useMutation({
        mutationFn: ({ data }: ConfirmPasswordResetRequest) => confirmPasswordReset({ data })
    })
}