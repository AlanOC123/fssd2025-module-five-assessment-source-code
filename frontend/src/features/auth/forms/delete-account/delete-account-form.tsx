import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "../schema";
import type { DeleteAccountData } from "../../types";
import { useAuth } from "../../hooks";

import { DeleteAccountView } from "./delete-account-view";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function DeleteAccountForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const { delete: deleteAccount, isLoading } = useAuth();

    const methods = useForm<DeleteAccountData>({
        resolver: zodResolver(deleteAccountSchema),
        mode: "onChange",
        defaultValues: {
                        challenge: "",
            password: "",
        }
    })

    const onSubmit = async (data: DeleteAccountData) => {
        try {
            await deleteAccount(data)
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.data.password) {
                    methods.setError("password", {
                        type: "manual",
                        message: "Incorrect password"
                    })
                } else {
                    toast.error("Could not delete account. Please try again.")
                }
            }
        }
    };

    return (
        <DeleteAccountView methods={methods} isPending={isLoading} onSubmit={onSubmit} setOpen={setOpen} />
    )
}
