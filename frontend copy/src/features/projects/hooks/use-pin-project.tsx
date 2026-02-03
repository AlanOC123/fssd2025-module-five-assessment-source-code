import { useQueryClient, useMutation } from "@tanstack/react-query";
import { pinProject } from "../services";
import { PROJECTS_KEYS } from "./keys";

export function usePinProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => pinProject(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: PROJECTS_KEYS.lists(),
            });
        },
    });
}
