import { type UpdateProjectData } from "../types";

import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";

export async function updateProject(id: number, payload: UpdateProjectData): Promise<void> {
    try {
        const response = await client.patch<void>(PROJECT_ENDPOINTS.detailed(id), payload);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}