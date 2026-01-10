import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";
import type { ProjectDetailItem } from "../types";

export async function getProjectItem(id: number): Promise<ProjectDetailItem> {
    try {
        const response = await client.get<ProjectDetailItem>(PROJECT_ENDPOINTS.detailed(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}