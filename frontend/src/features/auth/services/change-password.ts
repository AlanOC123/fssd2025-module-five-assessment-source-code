import { client } from "@/api";
import type { ChangePasswordData } from "../types";
import { CHANGE_PASSWORD_ROUTE } from "./endpoints";

export async function changePassword(data: ChangePasswordData) {
    try {
        const response = await client.post(CHANGE_PASSWORD_ROUTE, data);
        return response.data
    } catch (err) {
        console.error(err);
        throw err
    }
}