import * as z from "zod";
import { createProjectSchema, updateProjectSchema } from "../forms";
import { type UserProfile } from "@/features/users";
import type { UseFormReturn } from "react-hook-form";
import type { DateRange } from "react-day-picker";
import type { ReactNode } from "react";

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
    progress: number;
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

export interface CreateProjectRequest {
    data: CreateProjectData;
}

export interface UpdateProjectRequest {
    id: number;
    data: UpdateProjectData;
}

export interface UpdateProjectFormProps {
    open: boolean;
    onOpenChange: (curr: boolean) => void;
    project: ProjectDetailItem;
}

export interface UpdateProjectViewProps {
    methods: UseFormReturn<UpdateProjectData>;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isPending: boolean;
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    closeForm: () => void;
    onSubmit: (data: UpdateProjectData) => void;
}

export interface ProjectHealthProps {
    project: ProjectListItem;
    stats: {
        total: number;
        pending: number;
        overdue: number;
        completion: number;
    };
}

export interface ProjectHeaderProps {
    project: ProjectDetailItem;
    onEdit: () => void;
    onNewTask: () => void;
}

export type WorkspaceTab = "info" | "tasks" | "chat";

export interface ProjectWorkspaceContextType {
    project?: ProjectDetailItem;
    team: UserProfile[];
    isOwner: boolean;
    activeTab: WorkspaceTab;
    setActiveTab: (tab: WorkspaceTab) => void;

    updateTitle: (newTitle: string) => Promise<void>;
    updateDescription: (description: string) => Promise<void>;
    updateStartDate: (date?: string) => Promise<void>;
    updateEndDate: (date?: string) => Promise<void>;
}

export interface ProjectWorkspaceProviderProps {
    projectId: number;
    children: ReactNode;
}

export interface ProjectTimelineProps {
    startDate?: string | null;
    endDate?: string | null;
    isOwner: boolean;
    onUpdate: (s?: string, e?: string) => void;
}
export interface ProjectWorkspaceLayoutProps {
    projectId: number;
}
