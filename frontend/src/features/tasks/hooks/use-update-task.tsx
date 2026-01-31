import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { UpdateTaskMutationProps } from "../types";
import { updateTask } from "../services";
import { TASKS_KEYS } from "./keys";
import { PROJECTS_KEYS } from "@/features/projects";
import { toast } from "sonner";

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data, projectId }: UpdateTaskMutationProps) =>
            updateTask({ id, data }),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: TASKS_KEYS.detailed(variables.id),
            });
            queryClient.invalidateQueries({ queryKey: TASKS_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: PROJECTS_KEYS.detailed(variables.projectId) })
        },

        onError: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: TASKS_KEYS.detailed(variables.id)
            })

            toast.error("Error updating tasks")
        }
    });
}
