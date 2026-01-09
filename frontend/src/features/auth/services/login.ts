import { client } from "@/api";
import { LOGIN } from "./endpoints";
import { type LoginUserData } from "../types";

export async function login(credentials: LoginUserData) {
    try {
        const response = await client.post(LOGIN, credentials);
        return response.data;
    } catch (err) {
        // You might want to handle specific error logging here or in the hook (Step 2)
        console.log(err);
        throw err;
    }
}
