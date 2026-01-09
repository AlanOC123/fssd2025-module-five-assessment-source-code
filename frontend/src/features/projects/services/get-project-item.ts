import { client } from "@/api";
import { DETAILED_PROJECT_ROUTE } from "./endpoints";

export async function getProjectItem(id: number) {
    try {
        const response = await client.get(DETAILED_PROJECT_ROUTE(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}