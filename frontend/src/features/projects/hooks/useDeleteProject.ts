import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProject } from "../api";
import { toast } from "sonner";

export function useDeleteProject(id: number) {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: () => deleteProject(id),

        onError: () => {
            toast.error("Error deleting project...")
        },

        onSuccess: () => {
            toast.info("Project deleted.");

            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
        }
    })
}