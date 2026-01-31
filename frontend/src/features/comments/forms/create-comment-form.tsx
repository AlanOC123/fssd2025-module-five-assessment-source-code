// features/comments/forms/create-comment/create-comment-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCommentSchema } from "./schema";
import { useCreateComment } from "../hooks";
import { CreateCommentView } from "./create-comment-view";
import type { CreateCommentData } from "../types";

interface CreateCommentFormProps {
    projectId: number;
}

export function CreateCommentForm({ projectId }: CreateCommentFormProps) {
    // 1. Setup API Hook
    const { mutate: createComment, isPending } = useCreateComment();

    // 2. Setup Form Logic
    const methods = useForm<CreateCommentData>({
        resolver: zodResolver(createCommentSchema),
        defaultValues: {
            content: "",
        },
    });

    // 3. Handle Submission
    const handleSubmit = (data: CreateCommentData) => {
        createComment(
            { projectId, content: data.content },
            {
                onSuccess: () => {
                    methods.reset();
                },
            },
        );
    };

    return (
        <CreateCommentView
            methods={methods}
            isPending={isPending}
            onSubmit={handleSubmit}
        />
    );
}
