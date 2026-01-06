import * as z from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(5, "Enter a descriptive name..."),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    status: z
        .enum(["active", "pending"]),
});

export const sendInviteSchema = z.object({
    to: z.email(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const deleteProjectSchema = z
    .object({
        response: z.string(),
    })
    .refine((data) => data.response === "I want to delete this project", {
        message: "Please enter phrase to confirm",
        path: ["response"],
    });

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type updateProjectData = z.infer<typeof updateProjectSchema>;
export type deleteProjectData = z.infer<typeof deleteProjectSchema>;
