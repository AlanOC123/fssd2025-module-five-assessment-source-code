import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";
import type { ProjectMember } from "../types";

export const getProjectMembers = async (
    projectId: number,
): Promise<ProjectMember[]> => {
    try {
        const response = await client.get<ProjectMember[]>(
            PROJECT_ENDPOINTS.membersList(projectId),
        );
        return response.data;
    } catch (err) {
        console.error(err)
        throw err
    }
};
