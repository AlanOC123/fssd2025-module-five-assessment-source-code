import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeMember } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function useRemoveProjectMember(projectId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (membershipId: number) =>
            removeMember(projectId, membershipId),
        onSuccess: () => {
            toast.success("Access revoked");

            // Invalidate the members list to trigger a refetch
            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.members(projectId),
            });
        },
        onError: (error: any) => {
            const message =
                error.response?.data?.error || "Failed to remove member";
            toast.error(message);
        },
    });
}
