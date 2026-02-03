export const AUTH_KEYS = {
    all: () => ["auth"] as const,
    user: () => [...AUTH_KEYS.all(), 'user'] as const
};