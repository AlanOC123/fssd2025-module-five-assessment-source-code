import { useQuery } from "@tanstack/react-query";
import { TASKS_KEYS } from "./keys";
import type { Task } from "../types";
import { getTask } from "../services";

export function useGetTask(id: number) {
    return useQuery<Task>({
        queryKey: TASKS_KEYS.detailed(id),
        queryFn: () => getTask(id),
        enabled: !!id,
        retry: false,
    });
}
