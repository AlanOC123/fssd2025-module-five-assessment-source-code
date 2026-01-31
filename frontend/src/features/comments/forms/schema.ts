import * as z from 'zod';

export const createCommentSchema = z.object({
    content: z.string().min(1, "Message cannot be empty").trim()
})