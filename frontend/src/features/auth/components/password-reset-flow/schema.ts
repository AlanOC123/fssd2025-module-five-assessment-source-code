import * as z from 'zod';

export const resetPasswordSchema = z.object({
    email: z.email()
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;