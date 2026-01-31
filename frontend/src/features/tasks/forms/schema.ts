import * as z from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    project: z.number(),

    assigned_to: z.number().optional(),
    due_date: z.string().optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),

    assigned_to: z.number().nullable().optional(),
    due_date: z.string().nullable().optional(),

    is_completed: z.boolean().optional(),
});