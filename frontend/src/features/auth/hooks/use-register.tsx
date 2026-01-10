import { useMutation } from "@tanstack/react-query";
import { register } from "../services";
import type { RegisterMutationProps } from "../types";

export function useRegister() {
    return useMutation({
        mutationFn: ({ data } : RegisterMutationProps) => register(data)
    })
}