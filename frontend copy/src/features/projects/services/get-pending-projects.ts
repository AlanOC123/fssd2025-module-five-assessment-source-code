import { PROJECT_ENDPOINTS } from "./endpoints";
import { client } from "@/api";
import type { ProjectListItem } from "../types";

export async function getPendingProjects(): Promise<ProjectListItem[]> {
    try {
        const response = await client.get<ProjectListItem[]>(
            PROJECT_ENDPOINTS.pendingProjects,
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
