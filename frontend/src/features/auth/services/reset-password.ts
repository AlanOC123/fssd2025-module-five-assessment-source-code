import { PASSWORD_RESET_CONFIRM_ROUTE, PASSWORD_RESET_REQUEST_ROUTE } from "./endpoints";
import type { ConfirmPasswordResetPayload, RequestPasswordResetData } from "../types";
import { client } from "@/api";

export const requestPasswordReset = async (
    credentials: RequestPasswordResetData
) => {
    try {
        const response = await client.post(
            PASSWORD_RESET_REQUEST_ROUTE,
            credentials
        );
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const confirmPasswordReset = async (credentials: ConfirmPasswordResetPayload) => {
    try {
        const response = await client.post(PASSWORD_RESET_CONFIRM_ROUTE, credentials);
    return response.data;
    } catch(err) {
        console.log(err);
        throw err
    }
}