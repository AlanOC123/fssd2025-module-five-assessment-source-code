import { ChatThread } from "../components";
import { ChatMessageForm } from "../forms";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { useProjectWorkspace } from "@/features/projects";

export function ChatPanel() {
    const { project } = useProjectWorkspace();

    if (!project) return null;

    return (
        <div className="flex flex-col h-full bg-background border-l w-full overflow-hidden">
            {/* Header: Fixed size */}
            <div className="p-4 border-b flex items-center justify-between bg-muted/5 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                        <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm">Project Chat</h2>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Team Discussion
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Area: Takes up remaining space */}
            <div className="flex-1 min-h-0 relative">
                <ChatThread projectId={project.id} />
            </div>

            {/* Input Area: Fixed size at the bottom */}
            <div className="shrink-0 bg-background">
                <ChatMessageForm projectId={project.id} />
            </div>
        </div>
    );
}
