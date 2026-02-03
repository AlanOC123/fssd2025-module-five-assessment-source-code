import type { UserProfile } from "@/features/users";
import { createChatSchema } from "../forms";
import * as z from "zod";
import type { UseFormReturn } from "react-hook-form";

/**
 * The main Chat Message structure.
 */
export interface ChatMessage {
    id: number;
    project: number;
    author: number;
    author_detail: UserProfile;
    content: string;
    reactions: Record<string, number[]>;
    created_at: string;
    updated_at: string;
}

export type CreateChatData = z.infer<typeof createChatSchema>;

/**
 * Service Request Types
 */
export interface GetChatRequest {
    projectId: number;
}

export interface CreateChatRequest {
    data: {
        project: number;
        content: string;
    };
}

export interface UpdateChatRequest {
    commentId: number;
    data: {
        content: string;
    };
}

export interface DeleteChatRequest {
    commentId: number;
}

export interface ToggleReactionRequest {
    commentId: number;
    emoji: string;
}


export interface ChatMessageViewProps {
    methods: UseFormReturn<CreateChatData>;
    onSubmit: (data: CreateChatData) => void;
    isPending: boolean;
}

export interface ChatThreadProps {
    projectId: number;
}

export interface ChatPanelProps {
    projectId: number;
}