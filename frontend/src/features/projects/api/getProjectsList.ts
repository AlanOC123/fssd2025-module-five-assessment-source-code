import { api, ENDPOINTS } from "@/api";
import { type ProjectList, type GetProjectParams } from "../types";

export async function getProjectList(params: GetProjectParams): Promise<ProjectList[]> {
    const { data } = await api.get(ENDPOINTS.PROJECTS.BASE, { params });
    return data;
}
