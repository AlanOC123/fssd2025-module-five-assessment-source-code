import { createProject } from "../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { type CreateProjectDTO } from "../types";
import { toast } from "sonner";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProjectDTO) => createProject(payload),

        onError: () => toast.error("Error creating project"),

        onSuccess: () => {
            toast.success("Project created!");

            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}