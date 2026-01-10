import { client } from "@/api";
import { LOGIN_ROUTE } from "./endpoints";
import { type LoginUserData } from "../types";

export async function login(credentials: LoginUserData) {
    try {
        const response = await client.post(LOGIN_ROUTE, credentials);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
