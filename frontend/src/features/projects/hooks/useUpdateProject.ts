import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProject } from "../api";
import { toast } from "sonner";
import { type ProjectDetail } from "../types";

export function useUpdateProject(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: Partial<ProjectDetail>) =>
            updateProject(id, payload),

        onError: () => {
            toast.error("Error updating project...");
        },

        onSuccess: () => {
            toast.success("Project updated.");

            queryClient.invalidateQueries({
                queryKey: ["projects", id],
            });
        },
    });
}
