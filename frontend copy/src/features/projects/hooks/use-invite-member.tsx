import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { inviteMember } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function useInviteMember(projectId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (email: string) => inviteMember({ projectId, email }),
        onSuccess: () => {
            toast.success("Invitation sent!");
            // Refresh the team list to show the new 'Pending' member
            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.members(projectId),
            });
        },
        onError: () => {
            toast.error("Failed to send invitation");
        },
    });
}
