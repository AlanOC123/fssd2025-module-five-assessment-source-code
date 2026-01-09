import type { RequestPasswordResetData } from "../../types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordResetSchema } from "../schema";
import { toast } from "sonner";
import { useAuth } from "../../hooks";
import { RequestPasswordResetView } from "./request-password-reset-view";

export function RequestPasswordResetForm() {
    const { requestReset } = useAuth();

    const methods = useForm<RequestPasswordResetData>({
        resolver: zodResolver(requestPasswordResetSchema),
        mode: "onChange",
    });

    async function handleSubmit(credentials: RequestPasswordResetData) {
        try {
            await requestReset(credentials);
        } catch (err) {
            toast.info("Password reset link sent to email...");
            console.log(err);
        }
    }

    return (
        <RequestPasswordResetView
            methods={methods}
            handleSubmit={handleSubmit}
        />
    );
}
