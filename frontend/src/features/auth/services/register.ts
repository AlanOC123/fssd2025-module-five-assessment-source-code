import { client } from "@/api";
import { REGISTER_ROUTE } from "./endpoints";
import { type RegisterUserData } from "../types";

export const register = async (data: RegisterUserData) => {
    try {
        const response = await client.post(REGISTER_ROUTE, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};