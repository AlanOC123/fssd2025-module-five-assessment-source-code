import { type UpdateProjectData } from "../types";

import { client } from "@/api";
import { DETAILED_PROJECT_ROUTE } from "./endpoints";

export async function updateProject(id: number, payload: UpdateProjectData) {
    try {
        const response = await client.patch(DETAILED_PROJECT_ROUTE(id), payload);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}