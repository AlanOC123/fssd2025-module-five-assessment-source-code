import * as z from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().min(2, "First name too short"),
        lastName: z.string().min(2, "Last name too short"),
        dateOfBirth: z
            .string()
            .refine((val) => val !== "", "Date of birth is required"),
        email: z.email("Invalid email address"),
        confirmEmail: z.string(),
        password: z.string().min(8, "Password must be 8+ characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.email === data.confirmEmail, {
        path: ["confirmEmail"],
        error: "Emails don't match",
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        error: "Passwords dont match",
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterStep = "personal" | "account" | "security";
export const STEPS: RegisterStep[] = ["personal", "account", "security"];
