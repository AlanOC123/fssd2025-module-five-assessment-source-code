import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateTaskData } from "../types";
import { createTask } from "../services";
import { TASKS_KEYS } from "./keys";

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskData) => createTask({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASKS_KEYS.lists() });
        },
    });
}
