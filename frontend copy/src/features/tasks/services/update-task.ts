import { client } from "@/api";
import type { UpdateTaskRequestProps, Task } from "../types";
import { TASK_ENDPOINTS } from "./endpoints";

export async function updateTask({
    id,
    data,
}: UpdateTaskRequestProps): Promise<Task> {
    try {
        const response = await client.patch<Task>(
            TASK_ENDPOINTS.detail(id),
            data
        );
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}