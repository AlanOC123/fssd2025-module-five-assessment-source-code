import { AUTH_ENDPOINTS } from "./endpoints";
import type { ConfirmPasswordResetRequest, RequestPasswordResetRequest } from "../types";
import { client } from "@/api";

export const requestPasswordReset = async (
    { data }: RequestPasswordResetRequest
): Promise<void> => {
    try {
        const response = await client.post<void>(
            AUTH_ENDPOINTS.passwordResetRequest,
            data
        );
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const confirmPasswordReset = async ({ data }: ConfirmPasswordResetRequest): Promise<void> => {
    try {
        const response = await client.post<void>(AUTH_ENDPOINTS.confirmPasswordReset, data);
    return response.data;
    } catch(err) {
        console.log(err);
        throw err
    }
}