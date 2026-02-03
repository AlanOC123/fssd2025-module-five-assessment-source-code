import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../schema";
import type { ChangePasswordData } from "../../types";
import { useChangePassword } from "../../hooks/use-change-password";
import { ChangePasswordView } from "./change-password-view";
import { toast } from "sonner";

export function ChangePasswordForm() {
    const { mutateAsync: changePassword, isPending } = useChangePassword();

    const methods = useForm<ChangePasswordData>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",

        defaultValues: {
            old_password: "",
            new_password1: "",
            new_password2: "",
        },
    });

    const onSubmit = async (data: ChangePasswordData) => {
        try {
            await changePassword({ data });
            methods.reset();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong")
        }
    };

    return (
        <ChangePasswordView
            methods={methods}
            onSubmit={onSubmit}
            isPending={isPending}
        />
    );
}
