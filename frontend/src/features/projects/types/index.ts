import { type UserProfile } from "@/types"

interface ProjectMember {
    id: number, 
    email: string, 
    full_name: string
}

interface ProjectMembership {
    user: ProjectMember;
    access_level: "Viewer" | "Editor" | "Admin";
    status: "Pending (Invite Sent)" | "Active (Invite Accepted)" | "Rejected";
    date_sent: string;
}

export interface ProjectList {
    id: number;
    title: string;
    status: string;
    owner: ProjectMember;
    updated_at: string;
}

export interface ProjectDetail {
    id: number;
    title: string;
    description: string;
    status: "Pending" | "Active" | "Complete" | "Archived";
    owner: ProjectMember;
    owner_detail: UserProfile;
    members: ProjectMembership[];
    created_at: string;
    start_date: string;
    end_date: string;
    updated_at: string;
}

export interface PinnedProject {
    status: string,
    is_pinned: boolean
}

export interface GetProjectParams {
    query?: string
}

export interface CreateProjectDTO {
    title: string;
    description: string;
    start_data?: string;
    end_date?: string;
}