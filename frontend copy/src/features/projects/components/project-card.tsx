import { Link } from "react-router";
import { format } from "date-fns";
import { Pin } from "lucide-react";
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
import type { ProjectListItem } from "../types";
import { usePinProject } from "../hooks/use-pin-project";
// Ensure this path matches your router
import { APP_PATHS } from "@/router";

interface ProjectCardProps {
    project: ProjectListItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { mutate: togglePin } = usePinProject();

    const handlePin = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        togglePin(project.id);
    };

    return (
        <Link to={`/projects/${project.id}`}>
            <Card className="group relative flex flex-col h-[260px] overflow-hidden hover:shadow-lg hover:ring-2 hover:ring-primary/20 transition-all duration-300 border-border/60 bg-card">
                {/* Color/Gradient Header Area */}
                <div
                    className={`h-2 absolute top-0 left-0 right-0 ${
                        project.status === "active"
                            ? "bg-green-500"
                            : project.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                    }`}
                />

                {/* Pinned Indicator */}
                {project.is_pinned && (
                    <div className="absolute top-3 right-3 z-20">
                        <div className="bg-primary/10 text-primary p-1.5 rounded-full backdrop-blur-sm">
                            <Pin className="h-3 w-3 fill-current" />
                        </div>
                    </div>
                )}

                <CardHeader className="pt-8 pb-2">
                    <CardTitle className="text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                    {/* Spacer to push footer down */}
                </CardContent>

                <CardFooter className="pt-4 pb-4 border-t bg-muted/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <UserAvatar
                            src={project.owner.avatar}
                            firstName={project.owner.first_name}
                            lastName={project.owner.last_name}
                            className="h-6 w-6"
                        />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                Updated
                            </span>
                            <span className="text-xs font-medium">
                                {format(new Date(project.updated_at), "MMM d")}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePin}
                        className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Pin
                            className={`h-4 w-4 ${project.is_pinned ? "fill-primary" : ""}`}
                        />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
