import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteProject } from "../services";
import { toast } from "sonner";
import { LIST_PROJECTS_QUERY_KEY, DETAILED_PROJECT_QUERY_KEY } from "./keys";

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
                queryKey: LIST_PROJECTS_QUERY_KEY(),
            });

            queryClient.removeQueries({
                queryKey: DETAILED_PROJECT_QUERY_KEY(projectId),
            });
        },
    });
}
