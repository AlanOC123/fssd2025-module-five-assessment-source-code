import { api, ENDPOINTS } from "@/api";
import { type ProjectDetail } from "../types";

export async function updateProject(id: number, payload: Partial<ProjectDetail>) {
    const { data } = await api.patch(ENDPOINTS.PROJECTS.GET_BY_ID(id), payload);
    return data
}
