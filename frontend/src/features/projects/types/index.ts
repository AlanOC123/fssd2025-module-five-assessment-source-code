import * as z from 'zod'
import { createProjectSchema, updateProjectSchema } from '../forms';
import { type UserProfile } from "@/features/users";

export type ProjectStatus = "pending" | "active" | "complete" | "archived";
export type AccessLevel = "viewer" | "editor" | "admin";
export type MembershipStatus = "pending" | "active" | "rejected";

export interface ProjectListItem {
    id: number;
    title: string;
    status: ProjectStatus,
    owner: UserProfile,
    updated_at: string;
    is_pinned: boolean;
}

export interface ProjectMember {
    id: number;
    user: UserProfile;
    access_level: AccessLevel;
    status: MembershipStatus;
    date_sent: string;
}

export interface ProjectDetailItem extends ProjectListItem {
    description: string | null;
    members: ProjectMember[];
    created_at: string;
    start_date: string | null;
    end_date: string | null;
}

export interface PinnedProject {
    status: string;
    is_pinned: boolean;
}

export type ProjectQueryParam = {
    query: string | null
}

export type CreateProjectData = z.infer<typeof createProjectSchema>
export type UpdateProjectData = z.infer<typeof updateProjectSchema>