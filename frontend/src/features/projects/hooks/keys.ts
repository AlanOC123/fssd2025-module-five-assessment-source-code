export const ROOT_PROJECTS_QUERY_KEY = ["projects"] as const;

export const LIST_PROJECTS_QUERY_KEY = (filters?: {
    query?: string;
    status?: string;
}) => [...ROOT_PROJECTS_QUERY_KEY, "list", filters] as const;

export const DETAILED_PROJECT_QUERY_KEY = (id: number) => [...ROOT_PROJECTS_QUERY_KEY, id, "detail"] as const;
export const PINNED_PROJECTS_QUERY_KEY = [...ROOT_PROJECTS_QUERY_KEY, "pinned"] as const;