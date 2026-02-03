import * as z from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    project: z.number(),
    assigned_to: z.number().optional(),
    due_date: z.string().optional(),
});

export const updateTaskSchema = z.object({
    // We keep these as optional so we can send partial PATCH requests
    title: z.string().min(1).optional(),
    description: z.string().optional(),

    // .nullable() allows the UI to "Clear" the field (unassign/remove date)
    // .optional() allows us to omit the field entirely from the payload
    assigned_to: z.number().nullable().optional(),
    due_date: z.string().nullable().optional(),

    is_completed: z.boolean().optional(),
});
