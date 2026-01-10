import { client } from "@/api";
import { LOGOUT_ROUTE } from "./endpoints";

export const logout = async () => {
    try {
        const response = await client.post(LOGOUT_ROUTE, {});
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};