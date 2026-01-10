import { client } from "@/api";
import { PROJECT_ENDPOINTS } from './endpoints';
import { type CreateProjectData } from "../types";

export async function createProject(payload: CreateProjectData): Promise<void> {
    try {
        const response = await client.post<void>(PROJECT_ENDPOINTS.list(), payload);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}