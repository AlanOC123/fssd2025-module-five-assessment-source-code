import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProject } from "../services";
import { toast } from "sonner";
import { type UpdateProjectData } from "../types";
import { DETAILED_PROJECT_QUERY_KEY, LIST_PROJECTS_QUERY_KEY } from "./keys";

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: UpdateProjectData;
        }) => updateProject(id, payload),

        onError: () => {
            toast.error("Error updating project...");
        },

        onSuccess: (data, variables) => {
            const { id } = variables;

            toast.success("Project updated.");

            queryClient.invalidateQueries({
                queryKey: LIST_PROJECTS_QUERY_KEY(),
            });

            queryClient.invalidateQueries({
                queryKey: DETAILED_PROJECT_QUERY_KEY(id),
            });
        },
    });
}
