import { createProject } from "../services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateProjectRequest } from "../types";
import { toast } from "sonner";
import { PROJECTS_KEYS } from './keys';

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data }: CreateProjectRequest) => createProject({ data }),

        onError: () => toast.error("Error creating project"),

        onSuccess: () => {
            toast.success("Project created!");
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.lists() });
        },
    });
}
