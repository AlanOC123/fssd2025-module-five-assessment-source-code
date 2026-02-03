import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChatMessage } from "../services";
import { CHAT_KEYS } from "./keys";
import { toast } from "sonner";

export function useDeleteChat(projectId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteChatMessage,
        onSuccess: () => {
            // Since delete doesn't return the project ID, we pass it to the hook
            queryClient.invalidateQueries({
                queryKey: CHAT_KEYS.byProject(projectId),
            });
            toast.success("Message deleted");
        },
        onError: () => {
            toast.error("Failed to delete message");
        },
    });
}