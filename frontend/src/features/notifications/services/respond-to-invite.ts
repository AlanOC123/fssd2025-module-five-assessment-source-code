import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "@/features/projects";
import type { InvitationResponse, RespondToInviteProps } from "../types";

export async function respondToInvite({ projectId, accept }: RespondToInviteProps): Promise<InvitationResponse> {
    const status = accept ? "active" : "rejected";

    try {
        const response = client.post<InvitationResponse>(PROJECT_ENDPOINTS.respondToInvite(projectId), { status });
        return (await response).data
    } catch (err) {
        console.error(err);
        throw err
    }
}