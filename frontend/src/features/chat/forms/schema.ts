import * as z from 'zod';

export const createChatSchema = z.object({
    content: z.string().min(1, "Message cannot be empty").trim()
})