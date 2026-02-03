import { useQuery } from "@tanstack/react-query";
import type { Task, GetTasksRequestProps } from "../types";
import { TASKS_KEYS } from "./keys";
import { getTasks } from "../services";

export function useGetTasks(filters: GetTasksRequestProps = {}) {
    return useQuery<Task[]>({
        queryKey: TASKS_KEYS.list(filters),
        queryFn: () => getTasks(filters),
    });
}
