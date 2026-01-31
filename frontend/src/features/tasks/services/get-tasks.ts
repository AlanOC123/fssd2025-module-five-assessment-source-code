import { client } from "@/api";
import { TASK_ENDPOINTS } from "./endpoints";
import type { Task, GetTasksRequestProps } from "../types";

export async function getTasks({ project, search, is_completed, assigned_to }: GetTasksRequestProps = {}): Promise<
    Task[]
> {
    try {
        const params: Record<string, string | number | boolean> = {}
        if (project) params.project = project;
        if (search) params.search = search;
        if (is_completed !== undefined) params.is_completed = is_completed;
        if (assigned_to !== undefined) params.assigned_to = assigned_to;

        const response = await client.get<Task[]>(TASK_ENDPOINTS.root, {
            params,
        });

        return response.data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}
