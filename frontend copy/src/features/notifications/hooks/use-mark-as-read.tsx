import { markNotificationRead } from "../services";
import { NOTIFICATION_KEYS } from "./keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMarkNotificationRead() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: markNotificationRead,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
        },
    });
}
