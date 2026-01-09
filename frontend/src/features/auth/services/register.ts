import { client } from "@/api";
import { REGISTER } from "./endpoints";
import { type RegisterUserData } from "../types";

export const register = async (data: RegisterUserData) => {
    try {
        const response = await client.post(REGISTER, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};