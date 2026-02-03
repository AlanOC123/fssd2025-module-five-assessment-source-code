import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondToInvite } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function useRespondToInvite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectId,
            accept,
        }: {
            projectId: number;
            accept: boolean;
        }) =>
            respondToInvite({
                projectId,
                status: accept ? "active" : "rejected",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.pending() })
        },
    });
}
