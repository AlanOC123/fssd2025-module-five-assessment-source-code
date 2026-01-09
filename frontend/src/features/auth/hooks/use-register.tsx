import { useMutation } from "@tanstack/react-query";
import { register } from "../services";
import type { RegisterUserData } from "../types";

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterUserData) => register(data)
    })
}