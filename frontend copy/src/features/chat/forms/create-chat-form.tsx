import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateChat } from "../hooks";
import { ChatMessageView } from "./create-chat-view";
import { createChatSchema } from "./schema";
import type { CreateChatData } from "../types";

interface ChatMessageFormProps {
    projectId: number;
}

export function ChatMessageForm({ projectId }: ChatMessageFormProps) {
    const { mutate: sendMessage, isPending } = useCreateChat();

    const methods = useForm<CreateChatData>({
        resolver: zodResolver(createChatSchema),
        defaultValues: { content: "" },
    });

    const handleFormSubmit = (data: CreateChatData) => {
        sendMessage(
            { data: { project: projectId, content: data.content } },
            {
                onSuccess: () => {
                    methods.reset();
                },
            },
        );
    };

    return (
        <ChatMessageView
            methods={methods}
            onSubmit={handleFormSubmit}
            isPending={isPending}
        />
    );
}
