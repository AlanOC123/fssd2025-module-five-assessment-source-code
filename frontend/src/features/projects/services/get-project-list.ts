import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";
import type { ProjectListItem, ProjectListParamsProps } from "../types";

export async function getProjectList(params: ProjectListParamsProps): Promise<ProjectListItem[]> {
    try {
        const response = await client.get<ProjectListItem[]>(PROJECT_ENDPOINTS.list(), { params });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}