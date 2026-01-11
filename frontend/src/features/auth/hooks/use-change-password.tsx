import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ChangePasswordRequest } from "../types";
import { changePassword } from "../services";
import { AxiosError } from "axios";

export function useChangePassword() {
    return useMutation({
        mutationFn: ({ data }: ChangePasswordRequest) => changePassword({ data }),

        onSuccess: () => {
            toast.success("Password updated successfully")
        },

        onError: (err: unknown) => {
            if (err instanceof AxiosError) {
                const errData = err.response as ChangePasswordRequest;

                if (errData) {
                    toast.error("Your current password is incorrect.")
                } else {
                    toast.error("Could not change password")
                }
            }
        }
    })
}