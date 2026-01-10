import { requestPasswordReset, confirmPasswordReset } from "../services";
import { useMutation } from "@tanstack/react-query";
import type { RequestPasswordResetMutationProps, ConfirmPasswordResetMutationProps } from "../types";

export function useRequestReset() {
    return useMutation({
        mutationFn: ({ data }: RequestPasswordResetMutationProps) => requestPasswordReset(data)
    })
}

export function useConfirmReset() {
    return useMutation({
        mutationFn: ({ data }: ConfirmPasswordResetMutationProps) => confirmPasswordReset(data)
    })
}