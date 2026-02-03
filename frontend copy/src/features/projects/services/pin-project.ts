import { client } from "@/api";
import { PROJECT_ENDPOINTS } from "./endpoints";

export async function pinProject(id: number): Promise<void> {
    try {
        const response = await client.post<void>(PROJECT_ENDPOINTS.pin(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}