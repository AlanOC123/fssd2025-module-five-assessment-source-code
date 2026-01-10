import type { ProjectListParamsProps } from "../types"

export const PROJECTS_KEYS = {
    all: ["projects"] as const,
    lists: () => [...PROJECTS_KEYS.all, "list"] as const,
    list: (filters? : ProjectListParamsProps) => [...PROJECTS_KEYS.lists(), filters],
    detailed: (id: number) => [...PROJECTS_KEYS.all, id],
}