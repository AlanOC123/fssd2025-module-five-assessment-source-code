import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChatMessage } from "../services";
import { CHAT_KEYS } from "./keys";
import { toast } from "sonner";

export function useUpdateChat() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateChatMessage,
        onSuccess: (updatedMessage) => {
            queryClient.invalidateQueries({
                queryKey: CHAT_KEYS.byProject(updatedMessage.project),
            });
            toast.success("Message updated");
        },
        onError: () => {
            toast.error("Failed to update message");
        },
    });
}
