import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createProject } from "../services";
import { PROJECTS_KEYS } from "./keys";
import { APP_PATHS } from "@/router";
import type { CreateProjectRequest } from "../types";

export function useCreateProject() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ data }: CreateProjectRequest) => createProject({ data }),

        onError: (err) => {
            console.error(err);
            toast.error("Failed to create project");
        },

        onSuccess: (newProject) => {
            toast.success("Project created");
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.lists() });
            navigate(APP_PATHS.app.project(newProject.id));
        },
    });
}
