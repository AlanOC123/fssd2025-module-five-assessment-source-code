import { client } from "@/api";
import type { DeleteTaskRequestProps } from "../types";
import { TASK_ENDPOINTS } from "./endpoints";

export async function deleteTask({ id }: DeleteTaskRequestProps): Promise<void> {
    try {
        await client.delete(TASK_ENDPOINTS.detail(id));
    } catch (err) {
        console.error(err);
        throw err;
    }
}