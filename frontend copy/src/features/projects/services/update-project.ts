import type { ProjectDetailItem, UpdateProjectRequest } from "../types";

import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";

export async function updateProject({
    projectId,
    data,
}: UpdateProjectRequest): Promise<ProjectDetailItem> {
    try {
        const response = await client.patch<ProjectDetailItem>(
            PROJECT_ENDPOINTS.detailed(projectId),
            data,
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}