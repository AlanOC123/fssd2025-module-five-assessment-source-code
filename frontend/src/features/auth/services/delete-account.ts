import type { DeleteAccountData } from "../types";

import { client } from "@/api";
import { ACTIVE_USER_ROUTE } from "./endpoints";

export async function deleteAccount(payload: DeleteAccountData) {
    try {
        const response = await client.delete(ACTIVE_USER_ROUTE, {
            data: payload,
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
