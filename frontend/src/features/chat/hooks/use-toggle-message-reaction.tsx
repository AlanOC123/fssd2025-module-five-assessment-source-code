import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleMessageReaction } from "../services";
import { CHAT_KEYS } from "./keys";

export function useToggleReaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleMessageReaction,
        onSuccess: (updatedMessage) => {
            queryClient.invalidateQueries({
                queryKey: CHAT_KEYS.byProject(updatedMessage.project),
            });
        },
    });
}
