import { client } from "@/api";
import { LIST_PROJECTS_ROUTE } from "./endpoints";

export async function getProjectList(searchQuery?: string) {
    const params = searchQuery ? { search: searchQuery } : undefined;

    try {
        const response = await client.get(LIST_PROJECTS_ROUTE, { params });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}