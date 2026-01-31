// features/comments/forms/create-comment/create-comment-view.tsx
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components";
import type { CreateCommentData } from "../types";

interface CreateCommentViewProps {
    methods: UseFormReturn<CreateCommentData>;
    isPending: boolean;
    onSubmit: (data: CreateCommentData) => void;
}

export function CreateCommentView({
    methods,
    isPending,
    onSubmit,
}: CreateCommentViewProps) {
    const {
        register,
        formState: { errors },
    } = methods;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            methods.handleSubmit(onSubmit)();
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-4 bg-gray-50 border-t flex gap-2 items-end"
            >
                <Field className="flex-1 relative">
                    <Textarea
                        {...register("content")}
                        placeholder="Type a message... (Press Enter to send)"
                        className="min-h-12.5 max-h-12.5 resize-none focus-visible:ring-offset-0 bg-white"
                        onKeyDown={handleKeyDown}
                        disabled={isPending}
                    />
                    {errors.content && (
                        <p className="text-[10px] text-red-500 absolute -bottom-4 left-0">
                            {errors.content.message}
                        </p>
                    )}
                </Field>

                <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 shrink-0 mb-0.5"
                    disabled={isPending || !methods.watch("content")?.trim()}
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                    <span className="sr-only">Send message</span>
                </Button>
            </form>
        </FormProvider>
    );
}
