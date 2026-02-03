import { client } from "@/api";
import { AUTH_ENDPOINTS } from "./endpoints";
import { type LoginResponse, type RegisterRequest } from "../types";

export const register = async ({ data }: RegisterRequest): Promise<LoginResponse> => {
    try {
        const response = await client.post<LoginResponse>(AUTH_ENDPOINTS.register, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};