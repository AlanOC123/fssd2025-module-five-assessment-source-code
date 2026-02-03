import { client } from "@/api";
import { CHAT_ENDPOINTS } from "./endpoints";
import type { DeleteChatRequest } from "../types";

export async function deleteChatMessage({
    commentId,
}: DeleteChatRequest): Promise<void> {
    try {
        await client.delete(CHAT_ENDPOINTS.detail(commentId));
    } catch (err) {
        console.error("Error deleting chat message:", err);
        throw err;
    }
}
