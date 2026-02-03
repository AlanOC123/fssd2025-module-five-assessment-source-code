import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProject } from "../services";
import { toast } from "sonner";
import { PROJECTS_KEYS} from "./keys";

export function useDeleteProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProject(id),

        onError: () => {
            toast.error("Error deleting project...");
        },

        onSuccess: (data, variables) => {
            const projectId = variables;
            toast.info("Project deleted.");

            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.lists(),
            });

            queryClient.removeQueries({
                queryKey: PROJECTS_KEYS.detailed(projectId),
            });
        },
    });
}
