import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCommentRequest } from "../types";
import { createComment } from "../services";
import { COMMENTS_KEYS } from "./keys";

export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ data }: CreateCommentRequest) => createComment({ data }),

        onSuccess: (newComment) => {
            queryClient.invalidateQueries({
                queryKey: COMMENTS_KEYS.byProject(newComment.project)
            })
        }
    })
}