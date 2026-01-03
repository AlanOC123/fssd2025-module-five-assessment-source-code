import { api, ENDPOINTS } from "@/api";

export async function deleteProject(id: number) {
    const { data } = await api.delete(ENDPOINTS.PROJECTS.GET_BY_ID(id));
    return data
}
