import { useQueryClient, useMutation } from "@tanstack/react-query";
import { pinProject } from "../services";
import { PINNED_PROJECTS_QUERY_KEY } from "./keys";

export function usePinProject(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => pinProject(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: PINNED_PROJECTS_QUERY_KEY,
            });
        },
    });
}
