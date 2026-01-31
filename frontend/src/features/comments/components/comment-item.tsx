import { formatDistanceToNow } from "date-fns";
import { UserAvatar } from "@/features/users";
import type { Comment } from "../types";
import { useGetActiveUserProfile } from "@/features/users";

export function CommentItem({ comment }: { comment: Comment }) {
    const { data: user } = useGetActiveUserProfile();

    // Check if the logged-in user wrote this comment
    const isMe = user?.id === comment.author;

    return (
        <div className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
            {/* The Avatar */}
            <div className="mt-1">
                <UserAvatar
                    src={comment.author_detail.avatar}
                    firstName={comment.author_detail.first_name}
                    lastName={comment.author_detail.last_name}
                />
            </div>

            {/* The Bubble */}
            <div
                className={`flex flex-col max-w-[80%] ${isMe ? "items-end" : "items-start"}`}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">
                        {comment.author_detail.first_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                        })}
                    </span>
                </div>

                <div
                    className={`
                    p-3 rounded-lg text-sm
                    ${
                        isMe
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted text-foreground rounded-tl-none"
                    }
                `}
                >
                    {comment.content}
                </div>
            </div>
        </div>
    );
}
