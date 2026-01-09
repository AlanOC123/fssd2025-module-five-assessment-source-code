import { client } from "@/api";
import { ACTIVE_USER_ROUTE } from "./endpoints";

export async function getActiveUserProfile() {
    try {
        const response = await client.get(ACTIVE_USER_ROUTE)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}