import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTask } from "../services";
import { TASKS_KEYS } from "./keys";

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTask({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TASKS_KEYS.lists() });
        },
    });
}
