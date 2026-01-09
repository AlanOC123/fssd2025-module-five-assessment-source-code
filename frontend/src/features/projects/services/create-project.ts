import { client } from "@/api";
import { LIST_PROJECTS_ROUTE } from './endpoints';
import { type CreateProjectData } from "../types";

export async function createProject(payload: CreateProjectData) {
    try {
        const response = await client.post(LIST_PROJECTS_ROUTE, payload);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}