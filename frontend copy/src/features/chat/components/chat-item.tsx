import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Pencil, Trash2, Smile } from "lucide-react";
import { UserAvatar } from "@/features/users";
import { useActiveUser } from "@/features/auth/hooks";
import { useToggleReaction, useDeleteChat } from "../hooks";
import type { ChatMessage } from "../types";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";

export function ChatItem({ message }: { message: ChatMessage }) {
    const { data: user } = useActiveUser();
    const { mutate: toggleReaction } = useToggleReaction();
    const { mutate: deleteMessage } = useDeleteChat(message.project);

    const isMe = user?.id === message.author;

    // Helper to check if I have reacted with a specific emoji
    const hasReacted = (emoji: string) =>
        message.reactions?.[emoji]?.includes(user?.id ?? -1);

    return (
        <div
            className={`group flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"} mb-4`}
        >
            <UserAvatar
                src={message.author_detail.avatar}
                firstName={message.author_detail.first_name}
                lastName={message.author_detail.last_name}
            />

            <div
                className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">
                        {isMe ? "You" : message.author_detail.first_name}
                    </span>
                    <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatDistanceToNow(new Date(message.created_at), {
                            addSuffix: true,
                        })}
                    </span>
                </div>

                <div className="relative group/bubble">
                    <div
                        className={`p-3 rounded-2xl text-sm shadow-sm ${
                            isMe
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-muted text-foreground rounded-tl-none"
                        }`}
                    >
                        {message.content}
                    </div>

                    {/* Action Menu (Hover Only) */}
                    <div
                        className={`absolute top-0 ${isMe ? "-left-12" : "-right-12"} opacity-0 group-hover/bubble:opacity-100 transition-opacity flex gap-1`}
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={isMe ? "end" : "start"}>
                                <DropdownMenuItem
                                    onClick={() =>
                                        toggleReaction({
                                            commentId: message.id,
                                            emoji: "👍",
                                        })
                                    }
                                >
                                    <Smile className="mr-2 h-4 w-4" /> React
                                </DropdownMenuItem>
                                {isMe && (
                                    <>
                                        <DropdownMenuItem>
                                            <Pencil className="mr-2 h-4 w-4" />{" "}
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={() =>
                                                deleteMessage({
                                                    commentId: message.id,
                                                })
                                            }
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />{" "}
                                            Delete
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Reactions Row */}
                {Object.keys(message.reactions || {}).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(message.reactions).map(
                            ([emoji, users]) => (
                                <button
                                    key={emoji}
                                    onClick={() =>
                                        toggleReaction({
                                            commentId: message.id,
                                            emoji,
                                        })
                                    }
                                    className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 border transition-colors ${
                                        hasReacted(emoji)
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-muted/50 border-transparent text-muted-foreground"
                                    }`}
                                >
                                    <span>{emoji}</span>
                                    <span>{users.length}</span>
                                </button>
                            ),
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
