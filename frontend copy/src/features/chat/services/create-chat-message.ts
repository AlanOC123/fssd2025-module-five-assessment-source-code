import { client } from "@/api";
import { CHAT_ENDPOINTS } from "./endpoints";
import type { CreateChatRequest, ChatMessage } from "../types";

export async function createChatMessage({
    data,
}: CreateChatRequest): Promise<ChatMessage> {
    try {
        const response = await client.post<ChatMessage>(
            CHAT_ENDPOINTS.list,
            data,
        );
        return response.data;
    } catch (err) {
        console.error("Error creating chat message:", err);
        throw err;
    }
}
