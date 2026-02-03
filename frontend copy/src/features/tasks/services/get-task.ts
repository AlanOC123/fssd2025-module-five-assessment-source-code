import { client } from "@/api";
import { TASK_ENDPOINTS } from "./endpoints";
import type { Task } from "../types";

export async function getTask(id: number): Promise<Task> {
    try {
        const response = await client.get<Task>(TASK_ENDPOINTS.detail(id));
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
