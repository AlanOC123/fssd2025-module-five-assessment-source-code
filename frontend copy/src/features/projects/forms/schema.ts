import * as z from "zod";

const DELETE_PROJECT_CHALLENGE = "I want to delete this project.";

const CREATION_STATUSES = ["active", "pending"] as const;
const UPDATE_STATUSES = [
    ...CREATION_STATUSES,
    "complete",
    "archived",
] as const;

export const createProjectSchema = z.object({
    title: z.string().min(5, "Enter a descriptive name..."),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    status: z
        .enum(CREATION_STATUSES),
});

export const sendInviteSchema = z.object({
    to: z.email(),
});

export const updateProjectSchema = createProjectSchema
    .partial()
    .extend({ status: z.enum(UPDATE_STATUSES).optional() });

export const deleteProjectSchema = z
    .object({
        response: z.string(),
    })
    .refine((data) => data.response === DELETE_PROJECT_CHALLENGE, {
        message: "Please enter phrase to confirm",
        path: ["response"],
    });
