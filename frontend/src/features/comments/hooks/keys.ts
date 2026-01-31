export const COMMENTS_KEYS = {
    all: ["comments"] as const,
    byProject: (projectId: number) => [...COMMENTS_KEYS.all, projectId]
}