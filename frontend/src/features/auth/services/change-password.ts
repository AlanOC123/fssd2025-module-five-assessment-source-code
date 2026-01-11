import { client } from "@/api";
import type { ChangePasswordRequest } from "../types";
import { AUTH_ENDPOINTS } from "./endpoints";

export async function changePassword({
    data,
}: ChangePasswordRequest): Promise<void> {
    try {
        const response = await client.post<void>(
            AUTH_ENDPOINTS.changePassword,
            data
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
