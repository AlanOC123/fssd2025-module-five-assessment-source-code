import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";
import type { ProjectListItem, ProjectListParamsProps } from "../types";

export async function getProjectList(params: ProjectListParamsProps): Promise<ProjectListItem[]> {
    try {
        // The 'client' instance automatically handles the JWT Cookies.
        // We pass 'params' (like search queries) directly to Axios.
        const response = await client.get<ProjectListItem[]>(
            PROJECT_ENDPOINTS.list,
            { params },
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err; // Propagate error so React Query can catch it
    }
}