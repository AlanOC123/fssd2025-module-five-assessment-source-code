import * as z from "zod";
import { createProjectSchema, updateProjectSchema } from "../forms";
import { type UserProfile } from "@/features/users";
import type { UseFormReturn } from "react-hook-form";
import type { DateRange } from "react-day-picker";

export type ProjectStatus = "pending" | "active" | "complete" | "archived";
export type AccessLevel = "viewer" | "editor" | "admin";
export type MembershipStatus = "pending" | "active" | "rejected";

export interface ProjectListItem {
    id: number;
    title: string;
    status: ProjectStatus;
    owner: UserProfile;
    updated_at: string;
    is_pinned: boolean;
}

export interface ProjectDetailItem extends ProjectListItem {
    description: string | null;
    members: UserProfile[];
    created_at: string;
    start_date: string | null;
    end_date: string | null;
}

export interface PinnedProject {
    status: string;
    is_pinned: boolean;
}

export type ProjectQueryParam = {
    query: string | null;
};

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type UpdateProjectData = z.infer<typeof updateProjectSchema>;

export interface CreateProjectViewProps {
    methods: UseFormReturn<CreateProjectData>;
    open: boolean;
    onOpenChange: () => void;
    onSubmit: (data: CreateProjectData) => Promise<void>;
    dateRange: DateRange | undefined;
    setDateRange: (curr: DateRange | undefined) => void;
    closeForm: () => void;
    isPending: boolean;
}

export interface ProjectListParamsProps {
    search?: string;
    is_pinned?: boolean;
}

export interface SearchProjectsProps {
    currQuery: string;
    setCurrQuery: (curr: string) => void;
    results: ProjectListItem[];
    isFetching: boolean;
}
