import { client } from "@/api";
import { AUTH_ENDPOINTS } from "./endpoints";
import type { User } from "../types";

export async function activeUser(): Promise<User> {
    try {
        const response = await client.get<User>(AUTH_ENDPOINTS.activeUser);
        return response.data
    } catch (err) {
        console.error(err);
        throw err
    }
}