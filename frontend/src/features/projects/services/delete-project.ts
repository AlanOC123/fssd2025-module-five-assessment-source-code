import { client } from "@/api";
import { DETAILED_PROJECT_ROUTE } from "./endpoints";

export async function deleteProject(id: number) {
    try {
        const response = await client.delete(DETAILED_PROJECT_ROUTE(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}