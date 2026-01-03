import { api, ENDPOINTS } from "@/api";
import { type CreateProjectDTO } from "../types";

export async function createProject(payload: CreateProjectDTO) {
    const { data } = await api.post(ENDPOINTS.PROJECTS.BASE, payload);
    return data
}