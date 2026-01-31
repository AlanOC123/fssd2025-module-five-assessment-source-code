import type { UserProfile } from "@/features/users";
import { createCommentSchema } from "../forms";
import * as z from 'zod';

export interface Comment {
    id: number;
    project: number;
    author: number;
    author_detail: UserProfile;
    content: string;
    created_at: string;
}

export type CreateCommentData = z.infer<typeof createCommentSchema>;

export interface GetCommentsRequestProps {
    projectId: number;
}

export interface CreateCommentRequest {
    data: CreateCommentData
}

export interface ProjectDiscussionProps {
    projectId: number;
}