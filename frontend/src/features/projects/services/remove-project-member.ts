import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";

export const removeMember = async (projectId: number, membershipId: number) => {
    try {
        const response = await client.delete(
            PROJECT_ENDPOINTS.removeMember(projectId, membershipId),
        );
        return response.data;
    } catch (err) {
        console.error(err)
        throw err
    }
};
