import { CheckSquare, MessageSquare, Info } from "lucide-react";
import { ProjectWorkspaceProvider } from "../provider";
import { useProjectWorkspace } from "../hooks";
import { MobileNavItem, WorkspaceHeader } from "../components";
import type { ProjectWorkspaceLayoutProps } from '../types';
import { ProjectInfoPanel } from "./project-info-panel";
import { TasksPanel } from "@/features/tasks";

const ChatPanel = () => (
    <div className="p-6 text-muted-foreground">Chat Panel (Right)</div>
);

function WorkspaceLayoutContent() {
    const { activeTab, setActiveTab } = useProjectWorkspace();

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <WorkspaceHeader />

            <div className="flex-1 overflow-hidden relative">
                <div className="hidden lg:grid grid-cols-12 h-full divide-x">
                    <div className="col-span-3 overflow-y-auto bg-muted/5">
                        <ProjectInfoPanel />
                    </div>

                    <div className="col-span-5 overflow-y-auto bg-background">
                        <TasksPanel />
                    </div>

                    <div className="col-span-4 overflow-y-auto bg-muted/5 border-l">
                        <ChatPanel />
                    </div>
                </div>

                {/* MOBILE: Tabbed View */}
                {/* Visible on mobile, Hidden on lg screens */}
                <div className="lg:hidden h-full overflow-y-auto pb-20">
                    {activeTab === "info" && <ProjectInfoPanel />}
                    {activeTab === "tasks" && <TasksPanel />}
                    {activeTab === "chat" && <ChatPanel />}
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur z-50 pb-[env(safe-area-inset-bottom)]">
                <nav className="flex items-center justify-around h-16 px-2">
                    <MobileNavItem
                        icon={<Info className="w-5 h-5" />}
                        label="Overview"
                        isActive={activeTab === "info"}
                        onClick={() => setActiveTab("info")}
                    />
                    <MobileNavItem
                        icon={<CheckSquare className="w-5 h-5" />}
                        label="Tasks"
                        isActive={activeTab === "tasks"}
                        onClick={() => setActiveTab("tasks")}
                    />
                    <MobileNavItem
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="Chat"
                        isActive={activeTab === "chat"}
                        onClick={() => setActiveTab("chat")}
                    />
                </nav>
            </div>
        </div>
    );
}

export function ProjectWorkspaceLayout({
    projectId,
}: ProjectWorkspaceLayoutProps) {
    return (
        <ProjectWorkspaceProvider projectId={projectId}>
            <WorkspaceLayoutContent />
        </ProjectWorkspaceProvider>
    );
}
