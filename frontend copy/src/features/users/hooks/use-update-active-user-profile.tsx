import { useQueryClient, useMutation } from "@tanstack/react-query";

import { ACTIVE_USER_QUERY_KEY } from "./keys";
import { updateActiveUserProfile } from "../services";
import { toast } from "sonner";
import type { UpdateActiveUserRequest } from "../types";

export function useUpdateActiveUserProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data }: UpdateActiveUserRequest) => updateActiveUserProfile({ data }),

        onError: () => toast.error("Couldnt save changes..."),

        onSuccess: () => {
            toast.success("Saved changes!");
            queryClient.invalidateQueries({ queryKey: ACTIVE_USER_QUERY_KEY });
        },
    });
}
