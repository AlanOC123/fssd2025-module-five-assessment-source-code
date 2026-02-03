import { client } from "@/api";
import { CHAT_ENDPOINTS } from "./endpoints";
import type { GetChatRequest, ChatMessage } from "../types";

export async function getProjectChat({
    projectId,
}: GetChatRequest): Promise<ChatMessage[]> {
    try {
        const response = await client.get<ChatMessage[]>(CHAT_ENDPOINTS.list, {
            params: { project: projectId },
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching project chat:", err);
        throw err;
    }
}