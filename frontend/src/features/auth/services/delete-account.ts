import type { DeleteAccountRequest } from "../types";

import { client } from "@/api";
import { AUTH_ENDPOINTS } from "./endpoints";

export async function deleteAccount({ data }: DeleteAccountRequest): Promise<void> {
    try {
        const response = await client.delete<void>(AUTH_ENDPOINTS.activeUser, { data });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
