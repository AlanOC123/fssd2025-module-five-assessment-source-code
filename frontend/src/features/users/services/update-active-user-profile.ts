import { client } from "@/api"
import { ACTIVE_USER_ROUTE } from "./endpoints"

export async function updateActiveUserProfile(data: FormData) {
    try {
        const response = await client.patch(ACTIVE_USER_ROUTE, data);
        return response.data
    } catch (err) {
        console.error(err);
        throw err
    }
}