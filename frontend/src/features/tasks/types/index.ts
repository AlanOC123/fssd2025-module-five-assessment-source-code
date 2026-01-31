import * as z from 'zod'
import type { UserProfile } from "@/features/users";
import { createTaskSchema, updateTaskSchema } from "../forms/schema";
import type { UseFormReturn } from 'react-hook-form';

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

export type CreateTaskData = z.infer<typeof createTaskSchema>;
export type UpdateTaskData = z.infer<typeof updateTaskSchema>;

export interface GetTasksRequestProps {
    project?: number;
    search?: string;
    is_completed?: boolean;
    assigned_to?: number
}

export interface CreateTaskRequestProps {
    data: CreateTaskData;
}

export interface UpdateTaskRequestProps {
    id: number,
    data: UpdateTaskData
}

export interface DeleteTaskRequestProps {
    id: number
}

export interface CreateTaskViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    methods: UseFormReturn<CreateTaskData>;
    isPending: boolean;
    onSubmit: (data: CreateTaskData) => void;
    closeForm: () => void;
    members: UserProfile[];
}


export interface TaskCardProps {
    task: Task;
    onClick?: (task: Task) => void;
}
export interface TaskListProps {
    tasks: Task[];
    isLoading: boolean;
    setTask: (task: Task) => void;
}

export interface UpdateTaskViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    methods: UseFormReturn<UpdateTaskData>;
    isPending: boolean;
    onSubmit: (data: UpdateTaskData) => void;
    closeForm: () => void;
    members: UserProfile[],
}


export interface TaskAssigneeInputProps {
    members: UserProfile[];
}

export interface CreateTaskFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectId: number;
    members?: UserProfile[]
}

export interface UpdateTaskFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task | null;
    members: UserProfile[];
}

export interface UpdateTaskMutationProps extends UpdateTaskRequestProps {
    projectId: number;
}

export interface TaskSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export interface FilterTasksPillProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export type TaskStatusFilter = "active" | "completed" | "all";