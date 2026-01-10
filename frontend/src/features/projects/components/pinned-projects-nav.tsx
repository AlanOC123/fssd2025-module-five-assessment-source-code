import { Link, useLocation } from "react-router";
import { FolderDot, Pin } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetPinnedProjects } from "../hooks";

export function PinnedProjectsNav() {
    const { data: projects = [], isLoading } = useGetPinnedProjects();
    const location = useLocation();

    // 1. Loading State (Subtle pulsing bars)
    if (isLoading) {
        return (
            <div className="px-4 py-2 space-y-2">
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        );
    }

    // 2. Empty State (Hide the entire section if nothing is pinned)
    if (projects.length === 0) return null;

    return (
        <div className="py-2">
            <div className="px-4 mb-2 flex items-center justify-between">
                <h4 className="text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                    Pinned Projects
                </h4>
                <Pin className="h-3 w-3 text-muted-foreground/50" />
            </div>

            <div className="space-y-1 px-2">
                {projects.map((project) => {
                    const isActive =
                        location.pathname === `/projects/${project.id}`;

                    return (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className={`
                                group flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors 
                                ${
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }
                            `}
                        >
                            <FolderDot
                                className={`mr-2 h-4 w-4 transition-colors ${
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground/70 group-hover:text-primary"
                                }`}
                            />
                            <span className="truncate">{project.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
