import { client } from "@/api";
import { PROJECT_ENDPOINTS } from './endpoints';
import type { CreateProjectRequest, ProjectListItem } from "../types";

export async function createProject({ data }: CreateProjectRequest): Promise<ProjectListItem> {
    try {
        const response = await client.post<ProjectListItem>(PROJECT_ENDPOINTS.list, data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}