import { Link } from "react-router";
import { format } from "date-fns";
import { Pin } from "lucide-react";
import { capitaliseText } from "@/utils";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/features/users/components";

import type { ProjectListItem, ProjectStatus } from "../types";
import { usePinProject } from "../hooks";

// Status Colors Helper
const STATUS_COLORS: Record<ProjectStatus, string> = {
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    active: "bg-green-500/10 text-green-600 border-green-200",
    complete: "bg-blue-500/10 text-blue-600 border-blue-200",
    archived: "bg-gray-500/10 text-gray-600 border-gray-200",
};

interface ProjectCardProps {
    project: ProjectListItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { mutate: togglePin } = usePinProject();

    const handlePin = (e: React.MouseEvent) => {
        e.preventDefault(); // Stop navigation
        e.stopPropagation();
        togglePin(project.id);
    };

    console.log(project)

    return (
        <Link to={`/projects/${project.id}`}>
            <Card className="h-full hover:border-primary/50 transition-all cursor-pointer group flex flex-col relative overflow-hidden">
                {/* Pinned Indicator (Corner banner style optional, or just button) */}
                {project.is_pinned && (
                    <div className="absolute top-0 right-0 p-2">
                        <Pin className="h-4 w-4 text-primary fill-primary rotate-45" />
                    </div>
                )}

                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1">
                            <CardTitle className="line-clamp-1 text-base mr-6">
                                {project.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-1 text-xs">
                                Updated{" "}
                                {format(
                                    new Date(project.updated_at),
                                    "MMM d, yyyy"
                                )}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 py-2">
                    <Badge
                        variant="outline"
                        className={`${STATUS_COLORS[project.status]} border-0`}
                    >
                        {capitaliseText(project.status)}
                    </Badge>
                </CardContent>

                <CardFooter className="pt-4 border-t bg-muted/5 flex items-center justify-between mt-auto">
                    {/* Owner Info */}
                    <div className="flex items-center gap-2">
                        <UserAvatar
                            src={project.owner.avatar}
                            firstName={project.owner.first_name}
                            lastName={project.owner.last_name}
                        />
                        <span className="text-xs text-muted-foreground truncate max-w-25">
                            {project.owner.full_name}
                        </span>
                    </div>

                    {/* Actions */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-background hover:text-primary z-10"
                        onClick={handlePin}
                    >
                        <Pin
                            className={`h-4 w-4 ${
                                project.is_pinned
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                            }`}
                        />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
