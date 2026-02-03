import { useState, useMemo } from "react";
import { Search, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    SearchProjectModal,
    ProjectList,
    CreateProjectButton,
    InviteCard,
    usePendingProjects,
    useGetProjectList,
} from "@/features/projects";

export function HomePage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // 1. Fetch both lists
    const { data: projects, isLoading: isActiveLoading } = useGetProjectList();
    const { data: pendingInvites } = usePendingProjects();

    // 2. Sort Active projects (Pinned first)
    const sortedProjects = useMemo(() => {
        if (!projects) return [];
        return [...projects].sort((a, b) => {
            if (a.is_pinned && !b.is_pinned) return -1;
            if (!a.is_pinned && b.is_pinned) return 1;
            return (
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            );
        });
    }, [projects]);

    // 3. Rendering (Delegated to Components)
    return (
        <div className="h-full flex flex-col bg-muted/5">
            {/* Header */}
            <div className="shrink-0 px-8 py-6 border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold flex items-center gap-2 tracking-tight">
                            <LayoutGrid className="w-6 h-6 text-primary" />
                            Project Gallery
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Select a notebook to start collaborating.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden md:flex text-muted-foreground"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Find Project...
                        </Button>
                        <CreateProjectButton />
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8 space-y-10">
                    {/* --- NEW: Pending Invites Section --- */}
                    {pendingInvites && pendingInvites.length > 0 && (
                        <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                            <h2 className="text-sm font-semibold flex items-center gap-2 text-yellow-600 uppercase tracking-wider">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                </span>
                                Pending Invitations
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {pendingInvites.map((project) => (
                                    <InviteCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                            </div>
                            <div className="border-b pt-4 border-dashed" />
                        </div>
                    )}

                    {/* Active Projects Gallery */}
                    <div>
                        {/* Optional Label if invites exist, to separate them */}
                        {pendingInvites && pendingInvites.length > 0 && (
                            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                                Your Workspace
                            </h2>
                        )}
                        <ProjectList
                            projects={sortedProjects}
                            isLoading={isActiveLoading}
                        />
                    </div>
                </div>
            </div>

            <SearchProjectModal
                open={isSearchOpen}
                onOpenChange={setIsSearchOpen}
            />
        </div>
    );
}
