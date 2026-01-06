import { useQueryClient, useMutation } from "@tanstack/react-query";
import { pinProject } from "../api";

export function usePinProject(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => pinProject(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}
