import { createProject } from "../services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type CreateProjectData } from "../types";
import { toast } from "sonner";
import { PROJECTS_KEYS } from './keys';

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProjectData) => createProject(payload),

        onError: () => toast.error("Error creating project"),

        onSuccess: () => {
            toast.success("Project created!");
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.lists() });
        },
    });
}
