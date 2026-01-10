import * as z from "zod";

export const DELETE_ACCOUNT_CHALLENGE =
    "I confirm I want to delete my account.";

export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export const registerUserSchema = z
    .object({
        first_name: z.string().min(2, "First name too short"),
        last_name: z.string().min(2, "Last name too short"),
        date_of_birth: z
            .string()
            .refine((val) => val !== "", "Date of birth is required"),
        email: z.email("Invalid email address"),
        confirm_email: z.string(),
        password1: z.string().min(8, "Password must be 8+ characters"),
        password2: z.string(),
    })
    .refine((data) => data.email === data.confirm_email, {
        path: ["confirm_email"],
        error: "Emails don't match",
    })
    .refine((data) => data.password1 === data.password2, {
        path: ["password2"],
        error: "Passwords dont match",
    });

export const requestPasswordResetSchema = z.object({
    email: z.email(),
});

export const confirmPasswordResetSchema = z
    .object({
        password1: z.string().min(8, "New Password must be 8+ characters"),
        password2: z.string(),
    })
    .refine((data) => data.password1 === data.password2, {
        path: ["password2"],
        error: "Passwords must match!",
    });

export const updateEmailSchema = z
    .object({
        email: z.email("Invalid email address"),
        confirm_email: z.email("Invalid email address"),
    })
    .refine((data) => data.email === data.confirm_email, {
        message: "Emails do not match",
        path: ["confirm_email"],
    });

export const deleteAccountSchema = z
    .object({
        password: z.string().min(1, "Password is required"),
        challenge: z.string(),
    })
    .refine((data) => data.challenge === DELETE_ACCOUNT_CHALLENGE, {
        message: "You must type the confirmation phrase exactly.",
        path: ["challenge"],
    });

export const changePasswordSchema = z
    .object({
        old_password: z.string().min(1, "Current password required"),
        new_password1: z.string().min(8, "Create a strong password. 8+ characters"),
        new_password2: z.string(),
    })
    .refine((data) => data.new_password1 === data.new_password2, {
        error: "Passwords do not match",
        path: ["new_password2"]
    });
