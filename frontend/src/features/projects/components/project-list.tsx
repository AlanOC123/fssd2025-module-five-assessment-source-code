import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "./project-card";
import type { ProjectListItem } from "../types";

interface ProjectsListProps {
    projects: ProjectListItem[];
    isLoading: boolean;
    onCreateClick: () => void;
}

export function ProjectsList({
    projects,
    isLoading,
    onCreateClick,
}: ProjectsListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-50 rounded-xl border bg-card p-6 space-y-4"
                    >
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-5 w-8" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <div className="mt-auto pt-4 flex items-center gap-2 border-t">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 border-2 border-dashed rounded-lg p-8 text-center animate-in fade-in-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">No projects found</h3>
                <p className="text-muted-foreground mb-4 max-w-sm text-sm">
                    You haven't created any projects yet. Create your first one
                    to get started.
                </p>
                <Button onClick={onCreateClick}>Create Project</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
