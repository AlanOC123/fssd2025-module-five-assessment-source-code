import { client } from "@/api";
import type { CreateTaskRequestProps, Task } from "../types";
import { TASK_ENDPOINTS } from "./endpoints";

export async function createTask({ data }: CreateTaskRequestProps): Promise<Task> {
    try {
        const response = await client.post<Task>(TASK_ENDPOINTS.root, data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}