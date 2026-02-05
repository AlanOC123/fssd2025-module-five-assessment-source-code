import { client } from "@/api/client";
import { USERS_ENDPOINTS } from "./endpoints";
import type { UserProfile } from "../types";

export type UpdateActiveUserRequest = FormData;

export async function updateActiveUserProfile(
    formData: UpdateActiveUserRequest,
): Promise<UserProfile> {
    try {
        // Now this will log the actual FormData object (not undefined)
        console.log("Service sending:", formData);

        // Axios automatically sets 'Content-Type: multipart/form-data' when it sees FormData
        const response = await client.patch<UserProfile>(
            USERS_ENDPOINTS.activeUser,
            formData,
        );

        return response.data;
    } catch (err) {
        console.error("Service Error:", err);
        throw err;
    }
}
