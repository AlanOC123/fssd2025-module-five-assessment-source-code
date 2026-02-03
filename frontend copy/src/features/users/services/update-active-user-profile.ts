import { client } from "@/api"
import { USERS_ENDPOINTS } from "./endpoints"
import type { UpdateActiveUserRequest, UserProfile } from "../types";

export async function updateActiveUserProfile({ data }: UpdateActiveUserRequest): Promise<UserProfile> {
    try {
        const response = await client.patch<UserProfile>(USERS_ENDPOINTS.root, data);
        return response.data
    } catch (err) {
        console.error(err);
        throw err
    }
}