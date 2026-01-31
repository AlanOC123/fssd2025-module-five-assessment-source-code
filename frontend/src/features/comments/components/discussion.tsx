import { useRef, useEffect } from "react";
import { Loader2, MessageSquareOff } from "lucide-react";
import { useGetComments } from "../hooks";
import { CommentItem } from "./comment-item";
import { CreateCommentForm } from "../forms";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

interface ProjectDiscussionProps {
    projectId: number;
    className?: string; // Add className prop
}

export function ProjectDiscussion({
    projectId,
    className,
}: ProjectDiscussionProps) {
    const { data: comments, isLoading } = useGetComments(projectId);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on load and new message
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [comments]);

    return (
        // ✅ Changed: Flexible container that accepts external sizing
        <div
            className={cn(
                "flex flex-col h-full bg-background border-l",
                className,
            )}
        >
            {/* Header - Optional, maybe we hide this in the sidebar view */}
            <div className="p-3 border-b bg-muted/10 flex items-center gap-2 shrink-0">
                <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                    <MessageSquareOff className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">Team Chat</h3>
            </div>

            {/* Messages Area - Flex Grow to fill space */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 min-h-0">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                ) : comments?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                        <MessageSquareOff className="w-10 h-10 mb-2" />
                        <p className="text-sm">No messages yet</p>
                    </div>
                ) : (
                    comments?.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area - Pinned to bottom */}
            <div className="shrink-0 bg-background z-10">
                <CreateCommentForm projectId={projectId} />
            </div>
        </div>
    );
}
