import { requestPasswordReset, confirmPasswordReset } from "../services";
import { useMutation } from "@tanstack/react-query";
import type { RequestPasswordResetData, ConfirmPasswordResetPayload } from "../types";

export function useRequestReset() {
    return useMutation({
        mutationFn: (data: RequestPasswordResetData) => requestPasswordReset(data)
    })
}

export function useConfirmReset() {
    return useMutation({
        mutationFn: (data: ConfirmPasswordResetPayload) => confirmPasswordReset(data)
    })
}