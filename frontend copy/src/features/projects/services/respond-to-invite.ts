import { client } from "@/api"
import { PROJECT_ENDPOINTS } from "./endpoints"
import type { RespondtoInviteRequest, RespondToInviteResponse } from "../types"

export async function respondToInvite({
    projectId,
    status,
}: RespondtoInviteRequest): Promise<RespondToInviteResponse> {
    try {
        const response = await client.post<RespondToInviteResponse>(
            PROJECT_ENDPOINTS.respondToInvite(projectId),
            { status },
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}