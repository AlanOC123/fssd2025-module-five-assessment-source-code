import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProject } from "../services";
import { toast } from "sonner";
import { type UpdateProjectRequest } from "../types";
import { PROJECTS_KEYS } from "./keys";

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: UpdateProjectRequest) => updateProject({ id, data }),

        onError: (error, variables) => {
            console.error(error);
            toast.error("Error updating project...");

            const { id } = variables;

            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.detailed(id)
            })
        },

        onSuccess: (data, variables) => {
            const { id } = variables;

            toast.success("Project updated.");

            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.detailed(id),
            });
        },
    });
}
