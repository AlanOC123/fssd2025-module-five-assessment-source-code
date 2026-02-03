import { client } from "@/api";
import type { InviteMemberProps } from "../types";
import { PROJECT_ENDPOINTS } from "./endpoints";

export async function inviteMember({
    projectId,
    email,
}: InviteMemberProps): Promise<void> {
    try {
        const response = await client.post<void>(
            PROJECT_ENDPOINTS.inviteMember(projectId),
            { email },
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
