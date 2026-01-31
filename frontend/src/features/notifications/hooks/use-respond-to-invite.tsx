import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { respondToInvite } from "../services";
import { NOTIFICATION_KEYS } from "./keys";
import { PROJECTS_KEYS } from "@/features/projects";

import type { RespondToInviteProps } from "../types";

export function useRespondToInvite() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ projectId, accept }: RespondToInviteProps) => respondToInvite({ projectId, accept }),

        onSuccess: (_, variables) => {
            const action = variables.accept ? "Accepted" : "Rejected";

            toast.success(`Invitation ${action}`);

            queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
            
            if (variables.accept) {
                queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.all })
            }
        },

        onError: () => {
            toast.error("Failed to process invitation")
        }
    })
}