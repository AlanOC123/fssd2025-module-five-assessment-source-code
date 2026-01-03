import { api, ENDPOINTS } from "@/api";
import { type PinnedProject } from "../types";

export async function pinProject(id: number): Promise<PinnedProject> {
    const { data } = await api.post(ENDPOINTS.PROJECTS.TOGGLE_PIN(id));
    return data;
}
