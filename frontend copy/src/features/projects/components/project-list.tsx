import type { ProjectListItem } from "../types";
import { ProjectCard } from "./project-card"; // Assuming you have this
import { Loader2, FolderOpen } from "lucide-react";

interface ProjectListProps {
    projects?: ProjectListItem[];
    isLoading: boolean;
}

export function ProjectList({ projects, isLoading }: ProjectListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
            </div>
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/20">
                <div className="bg-muted p-4 rounded-full mb-4">
                    <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground">
                    No projects yet
                </h3>
                <p className="text-sm">
                    Create your first project to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-32 px-4 overflow-y-auto">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
