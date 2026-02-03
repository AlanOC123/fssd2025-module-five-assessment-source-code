export const CHAT_KEYS = {
    all: ["chat"] as const,
    lists: () => [...CHAT_KEYS.all, "list"] as const,
    byProject: (projectId: number) =>
        [...CHAT_KEYS.lists(), { projectId }] as const,
};
