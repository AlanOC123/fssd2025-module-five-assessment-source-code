import { PASSWORD_RESET_CONFIRM, PASSWORD_RESET_REQUEST } from "./endpoints";
import type { ConfirmPasswordResetPayload, RequestPasswordResetData } from "../types";
import { client } from "@/api";

export const confirmPasswordReset = async (credentials: ConfirmPasswordResetPayload) => {
    try {
        const response = await client.post(PASSWORD_RESET_CONFIRM, credentials);
    return response.data;
    } catch(err) {
        console.log(err);
        throw err
    }
}

export const requestPasswordReset = async (credentials: RequestPasswordResetData) => {
    try {
        const response = await client.post(PASSWORD_RESET_REQUEST, credentials);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};