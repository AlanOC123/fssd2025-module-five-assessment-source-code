import { client } from "@/api";
import { CHAT_ENDPOINTS } from "./endpoints";
import type { ToggleReactionRequest, ChatMessage } from "../types";

export async function toggleMessageReaction({
    commentId,
    emoji,
}: ToggleReactionRequest): Promise<ChatMessage> {
    try {
        const response = await client.post<ChatMessage>(
            CHAT_ENDPOINTS.react(commentId),
            { emoji },
        );
        return response.data;
    } catch (err) {
        console.error("Error toggling reaction:", err);
        throw err;
    }
}
