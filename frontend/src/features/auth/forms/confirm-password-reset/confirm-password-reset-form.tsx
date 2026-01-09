import type { ConfirmPasswordResetData } from "../../types";

import { useSearchParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { ConfirmPasswordResetView } from "./password-confirm-view";
import { confirmPasswordResetSchema } from "../schema";

export function ConfirmPasswordResetForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { confirmReset } = useAuth();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    useEffect(() => {
        if (!uid || !token) {
            navigate("/auth/login");
        }
    }, [uid, token, navigate]);

    const methods = useForm<ConfirmPasswordResetData>({
        resolver: zodResolver(confirmPasswordResetSchema),
        mode: "onChange",
    });

    async function handleSubmit(credentials: ConfirmPasswordResetData) {
        if (uid && token) {
            confirmReset({
                uid,
                token,
                new_password1: credentials.password1,
                new_password2: credentials.password2,
            });
        }
    }

    return (
        <ConfirmPasswordResetView
            methods={methods}
            handleSubmit={handleSubmit}
        />
    );
}
