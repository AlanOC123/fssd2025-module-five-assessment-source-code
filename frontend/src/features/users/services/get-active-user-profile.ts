import { client } from "@/api";
import { USERS_ENDPOINTS } from "./endpoints";

export async function getActiveUserProfile() {
    try {
        const response = await client.get(USERS_ENDPOINTS.activeUser)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}