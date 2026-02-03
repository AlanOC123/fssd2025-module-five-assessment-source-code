import { useState } from "react";
import { format } from "date-fns";
import { Calendar, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components";

import type { ProjectDetailItem, ProjectStatus } from "../types";

const STATUS_COLORS: Record<ProjectStatus, string> = {
    pending:
        "bg-yellow-500/10 text-yellow-600 border-yellow-200 hover:bg-yellow-500/20",
    active: "bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20",
    complete:
        "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20",
    archived:
        "bg-gray-500/10 text-gray-600 border-gray-200 hover:bg-gray-500/20",
};

interface ProjectDetailHeaderProps {
    project: ProjectDetailItem;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

export function ProjectDetailHeader({
    project,
    onEdit,
    onDelete,
    isDeleting,
}: ProjectDetailHeaderProps) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {project.title}
                    </h1>
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <Badge
                            variant="outline"
                            className={`capitalize border-0 ${
                                STATUS_COLORS[project.status]
                            }`}
                        >
                            {project.status}
                        </Badge>
                        {project.end_date && (
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Due{" "}
                                {format(
                                    new Date(project.end_date),
                                    "MMM d, yyyy"
                                )}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions Dropdown */}
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={onEdit}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                onClick={() => setShowDeleteAlert(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                Project
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                {project.description || "No description provided."}
            </p>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the project
                            <span className="font-bold text-foreground">
                                {" "}
                                "{project.title}"{" "}
                            </span>
                            and remove all associated tasks and data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={(e: MouseEvent) => {
                                e.preventDefault();
                                onDelete();
                            }}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete Project"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
