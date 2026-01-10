import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";

export async function deleteProject(id: number): Promise<void> {
    try {
        const response = await client.delete<void>(PROJECT_ENDPOINTS.detailed(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}