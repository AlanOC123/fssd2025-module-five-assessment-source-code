import { client } from "@/api";
import { LOGOUT } from "./endpoints";

export const logout = async () => {
    try {
        const response = await client.post(LOGOUT, {});
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};