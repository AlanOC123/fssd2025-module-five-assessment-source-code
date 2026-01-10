import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ChangePasswordMutationProps } from "../types";
import { changePassword } from "../services";
import { AxiosError } from "axios";

export function useChangePassword() {
    return useMutation({
        mutationFn: ({ data }: ChangePasswordMutationProps) => changePassword(data),

        onSuccess: () => {
            toast.success("Password updated successfully")
        },

        onError: (err: unknown) => {
            if (err instanceof AxiosError) {
                const { response } = err;

                if (response?.data?.old_password) {
                    toast.error("Your current password is incorrect.")
                } else {
                    toast.error("Could not change password")
                }
            }
        }
    })
}