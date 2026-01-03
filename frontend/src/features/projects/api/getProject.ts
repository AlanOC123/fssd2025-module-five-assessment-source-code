import { api, ENDPOINTS } from "@/api";
import { type ProjectDetail } from "../types";

export async function getProject(id: number): Promise<ProjectDetail[]> {
    const { data } = await api.get(ENDPOINTS.PROJECTS.GET_BY_ID(id));
    return data;
}
