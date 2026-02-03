import * as z from "zod";
import type { UseFormReturn } from "react-hook-form";
import type { UserProfile } from "@/features/users";
import type { ProjectDetailItem } from "@/features/projects";
import { createTaskSchema, updateTaskSchema } from "../forms";

// --- 1. Core Data Models ---
export interface Task {
    id: number;
    title: string;
    description: string;
    project: number;
    assigned_to: number | null;
    assigned_to_detail: UserProfile | null;
    is_completed: boolean;
    completed_by_detail: UserProfile | null;
    completed_at: string | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

// --- 2. Zod Inferred Types ---
export type CreateTaskData = z.infer<typeof createTaskSchema>;
export type UpdateTaskData = z.infer<typeof updateTaskSchema>;

// --- 3. Request Props (API/Service Layer) ---
export interface GetTasksRequestProps {
    project?: number;
    search?: string;
    is_completed?: boolean;
    assigned_to?: number;
}

export interface CreateTaskRequestProps {
    data: CreateTaskData;
}

export interface UpdateTaskRequestProps {
    id: number;
    data: UpdateTaskData;
}

export interface UpdateTaskMutationProps extends UpdateTaskRequestProps {
    projectId: number;
}

// --- 4. View Props (Presentational Components) ---
export interface CreateTaskViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    methods: UseFormReturn<CreateTaskData>;
    isPending: boolean;
    onSubmit: (data: CreateTaskData) => void;
    closeForm: () => void;
    members: UserProfile[];
    minDate?: Date; // Changed to Date for consistency with Calendar
    maxDate?: Date;
}

export interface UpdateTaskViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    methods: UseFormReturn<UpdateTaskData>;
    isPending: boolean;
    closeForm: () => void;
    members: UserProfile[];
    minDate?: Date;
    maxDate?: Date;
    // Generic atomic update handler
    onUpdate: <K extends keyof UpdateTaskData>(
        field: K,
        value: UpdateTaskData[K],
    ) => void;
}

// --- 5. Form Props (Container Components) ---
export interface CreateTaskFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: ProjectDetailItem;
    members: UserProfile[];
}

export interface UpdateTaskFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task | null;
    members: UserProfile[];
}

// --- 6. Component Specific Props ---
export interface TaskCardProps {
    task: Task;
    onClick?: (task: Task) => void;
}

export interface TaskListProps {
    tasks: Task[];
    isLoading: boolean;
    onTaskClick: (task: Task) => void;
}

export interface TaskAssigneeInputProps {
    members: UserProfile[];
    // onUpdate optional so it works in both Create (Submit) and Update (Live Save) modes
    onUpdate?: (value: number | null) => void;
}

export interface TaskDueDateInputProps {
    minDate?: Date;
    maxDate?: Date;
    onUpdate?: (value: string | null) => void;
}

// --- 7. Utility Types ---
export type TaskStatusFilter = "active" | "completed" | "all";
