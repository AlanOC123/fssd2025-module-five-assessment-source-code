import { client } from "@/api";
import { ACTIVE_USER } from "./endpoints";

export async function activeUser() {
    try {
        const response = await client.get(ACTIVE_USER);
        return response.data
    } catch (err) {
        console.error(err);
        throw err
    }
}