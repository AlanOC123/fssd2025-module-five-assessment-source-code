import type { GetTasksRequestProps } from "../types"

export const TASKS_KEYS = {
    all: ["tasks"] as const,
    lists: () => [...TASKS_KEYS.all, "list"] as const,
    list: (filters? : GetTasksRequestProps) => [...TASKS_KEYS.lists(), filters],
    detailed: (id: number) => [...TASKS_KEYS.all, id],
}