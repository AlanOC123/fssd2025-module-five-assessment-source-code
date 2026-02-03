import * as z from "zod";
import { updateProjectSchema } from "../forms";
import { type UserProfile } from "@/features/users";
import type { UseFormReturn } from "react-hook-form";
import type { DateRange } from "react-day-picker";
import type { ReactNode } from "react";

// --- 1. Domain Models ---

export type ProjectStatus = "pending" | "active" | "complete" | "archived";
export type AccessLevel = "viewer" | "editor" | "admin";
export type MembershipStatus = "pending" | "active" | "rejected";

// Lightweight shape for the Dashboard Grid (Performance Optimization)
export interface ProjectListItem {
    id: number;
    title: string;
    status: ProjectStatus;
    owner: UserProfile;
    updated_at: string;
    is_pinned: boolean; 
}
// Heavy shape for the Project Workspace
// Extends the list item to avoid code duplication
export interface ProjectDetailItem extends ProjectListItem {
    description: string | null;
    members: UserProfile[]; // Relation: Many-to-Many
    start_date: string | null;
    end_date: string | null;
    progress: number; // Computed field from Backend
}

export interface PinnedProject {
    status: string;
    is_pinned: boolean;
}

export interface ProjectMember {
    id: number; // The Membership ID (used for removal)
    email: string; // The email (either from User or invite_email)
    first_name: string; // Placeholder "Pending" if user is null
    last_name: string; // Placeholder "Invite" if user is null
    avatar: string | null;
    status: "pending" | "active" | "rejected";
    access_level: "viewer" | "editor" | "admin";
    date_sent: string;
}

export type ProjectQueryParam = {
    query: string | null;
};

export interface CreateProjectData {
    title: string;
    description?: string;
}

// --- 2. Validation Integration ---

// We infer the type directly from the Zod Schema.
// If the validation rules change, this type updates automatically.

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

// --- 3. Workspace State Definition ---

export type WorkspaceTab = "info" | "tasks" | "chat";
export type WorkspaceChangesActions = "sync" | "commit"
export type WorkspaceChangesField = keyof Partial<ProjectDetailItem>
export interface WorkspaceChangesProps {
    field: WorkspaceChangesField;
    action: WorkspaceChangesActions;
    value?: string
}

// This interface defines the "Brain" of the project view,
// shared via React Context to avoid Prop Drilling.
export interface ProjectWorkspaceContextType {
    project?: ProjectDetailItem;
    team: UserProfile[];
    isOwner: boolean;
    activeTab: WorkspaceTab;
    setActiveTab: (tab: WorkspaceTab) => void;
    // Centralized mutation handler for optimistic UI updates
    makeChanges: ({ field, action, value }: WorkspaceChangesProps) => void 
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

export interface SearchProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface ShareProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectName: string;
    projectId: number;
}

export interface InviteMemberProps {
    projectId: number;
    email: string;
}

export interface RespondtoInviteRequest {
    projectId: number;
    status: "active" | "rejected"
}

export interface RespondToInviteResponse {
    data: {
        status: string,
        error: string
    },
    status: number
}

export interface UpdateProjectRequest {
    projectId: number;
    data: Partial<
        Pick<ProjectDetailItem, "title" | "description" | "status" | "is_pinned">
    >;
}