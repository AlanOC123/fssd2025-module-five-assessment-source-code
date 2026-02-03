import { client } from "@/api";
import { AUTH_ENDPOINTS } from "./endpoints";

export const logout = async (): Promise<void> => {
    try {
        const response = await client.post<void>(AUTH_ENDPOINTS.logout, {});
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};