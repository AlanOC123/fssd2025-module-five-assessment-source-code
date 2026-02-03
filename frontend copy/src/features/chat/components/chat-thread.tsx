import { useRef, useEffect } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { useGetChat } from "../hooks";
import { ChatItem } from "./chat-item";
import type { ChatThreadProps } from '../types'

export function ChatThread({ projectId }: ChatThreadProps) {
    const { data: messages, isLoading } = useGetChat(projectId);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground mt-2">
                    Loading messages...
                </p>
            </div>
        );
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full opacity-50">
                <MessageSquare className="w-12 h-12 mb-2" />
                <p className="text-sm">
                    No messages yet. Start the conversation!
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
            {messages.map((message) => (
                <ChatItem key={message.id} message={message} />
            ))}
            <div ref={bottomRef} />
        </div>
    );
}
