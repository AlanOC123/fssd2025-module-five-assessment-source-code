import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProject } from "../services";
import { toast } from "sonner";
import { type UpdateProjectData } from "../types";
import { PROJECTS_KEYS } from "./keys";

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
                queryKey: PROJECTS_KEYS.lists(),
            });

            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.detailed(id),
            });
        },
    });
}
