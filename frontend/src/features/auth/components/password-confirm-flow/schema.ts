import * as z from "zod";

export const passwordConfimationSchema = z
    .object({
        password: z.string().min(8, "New Password must be 8+ characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        error: "Passwords must match!",
    });

export type PasswordConfirmationData = z.infer<
    typeof passwordConfimationSchema
>;

export type PasswordConfirmationRequestData = {
    uid: string | undefined;
    token: string | undefined;
    new_password1: string;
    new_password2: string;
};
