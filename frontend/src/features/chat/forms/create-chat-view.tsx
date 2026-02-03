import { SendHorizonal } from "lucide-react";
import { Button, Textarea } from "@/components";
import type { ChatMessageViewProps } from "../types";

export function ChatMessageView({
    methods,
    onSubmit,
    isPending,
}: ChatMessageViewProps) {
    const { register, handleSubmit, watch } = methods;
    const content = watch("content");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border-t bg-background flex items-end gap-2"
        >
            <div className="flex-1">
                <Textarea
                    {...register("content")}
                    placeholder="Type a message..."
                    className="min-h-11 max-h-30 resize-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }
                    }}
                />
            </div>
            <Button type="submit" size="icon" disabled={isPending || !content}>
                <SendHorizonal className="w-4 h-4" />
            </Button>
        </form>
    );
}
