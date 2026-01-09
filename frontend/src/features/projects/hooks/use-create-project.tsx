import { createProject } from "../services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type CreateProjectData } from "../types";
import { toast } from "sonner";
import { LIST_PROJECTS_QUERY_KEY } from './keys';

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProjectData) => createProject(payload),

        onError: () => toast.error("Error creating project"),

        onSuccess: () => {
            toast.success("Project created!");
            queryClient.invalidateQueries({ queryKey: LIST_PROJECTS_QUERY_KEY() });
        },
    });
}
