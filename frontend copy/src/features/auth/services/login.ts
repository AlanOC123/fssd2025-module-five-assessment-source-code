import { client } from "@/api";
import { AUTH_ENDPOINTS } from "./endpoints";
import { type LoginResponse, type LoginRequest } from "../types";

export async function login({ data }: LoginRequest): Promise<LoginResponse> {
    try {
        const response = await client.post<LoginResponse>(AUTH_ENDPOINTS.login, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
