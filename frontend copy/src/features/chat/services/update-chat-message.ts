import { client } from "@/api";
import { CHAT_ENDPOINTS } from "./endpoints";
import type { UpdateChatRequest, ChatMessage } from "../types";

export async function updateChatMessage({
    commentId,
    data,
}: UpdateChatRequest): Promise<ChatMessage> {
    try {
        const response = await client.patch<ChatMessage>(
            CHAT_ENDPOINTS.detail(commentId),
            data,
        );
        return response.data;
    } catch (err) {
        console.error("Error updating chat message:", err);
        throw err;
    }
}
