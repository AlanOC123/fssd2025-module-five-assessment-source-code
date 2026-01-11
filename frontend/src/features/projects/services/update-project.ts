import type { ProjectDetailItem, UpdateProjectRequest } from "../types";

import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";

export async function updateProject({
    id,
    data,
}: UpdateProjectRequest): Promise<ProjectDetailItem> {
    try {
        const response = await client.patch<ProjectDetailItem>(
            PROJECT_ENDPOINTS.detailed(id),
            data
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}