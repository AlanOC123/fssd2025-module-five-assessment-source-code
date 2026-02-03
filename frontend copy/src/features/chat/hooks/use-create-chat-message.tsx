import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatMessage } from "../services";
import { CHAT_KEYS } from "./keys";
import { toast } from "sonner";

export function useCreateChat() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createChatMessage,
        onSuccess: (newMessage) => {
            queryClient.invalidateQueries({
                queryKey: CHAT_KEYS.byProject(newMessage.project),
            });
        },
        onError: () => {
            toast.error("Failed to send message");
        },
    });
}
