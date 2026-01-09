import { client } from "@/api";
import { PIN_PROJECT_ROUTE } from "./endpoints";

export async function pinProject(id: number) {
    try {
        const response = await client.get(PIN_PROJECT_ROUTE(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}