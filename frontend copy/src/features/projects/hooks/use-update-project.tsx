import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProjectRequest } from "../types";
import { updateProject } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ projectId, data }: UpdateProjectRequest) => updateProject({ projectId, data }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.detailed(data.id) });
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.all });
        },
    });
}
