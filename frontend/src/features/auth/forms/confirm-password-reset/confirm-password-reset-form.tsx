import type { ConfirmPasswordResetData } from "../../types";

import { useParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { ConfirmPasswordResetView } from "./password-confirm-view";
import { confirmPasswordResetSchema } from "../schema";
import { toast } from "sonner";

export function ConfirmPasswordResetForm() {
    const navigate = useNavigate();
    const params = useParams();

    const { confirmReset } = useAuth();

    const uid = params.uid;
    const token = params.token;

    useEffect(() => {
        if (!uid || !token) {
            navigate("/auth/login");
        }
    }, [uid, token, navigate]);

    const methods = useForm<ConfirmPasswordResetData>({
        resolver: zodResolver(confirmPasswordResetSchema),
        mode: "onChange",
    });

    async function onSubmit(credentials: ConfirmPasswordResetData) {
        console.log(credentials)
        try {
            await confirmReset({
                uid,
                token,
                new_password1: credentials.password1,
                new_password2: credentials.password2,
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to reset password")
        }
    }

    return (
        <ConfirmPasswordResetView
            methods={methods}
            handleSubmit={onSubmit}
        />
    );
}
