import { useState } from "react";
import { format, isPast, isToday } from "date-fns";
import {
    CheckCircle2,
    Circle,
    MoreVertical,
    Trash2,
    Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useDeleteTask, useUpdateTask } from "../hooks";
import type { TaskCardProps } from "../types";
import { DeleteTaskDialog } from "./delete-task-dialog";
import { UserAvatar } from "@/features/users";
import { useProjectWorkspace } from "@/features/projects";
import { useActiveUser } from "@/features/auth";

export function TaskCard({ task, onClick }: TaskCardProps) {
    const { isOwner } = useProjectWorkspace();
    const { data: user } = useActiveUser();

    const { mutate: updateTask } = useUpdateTask();
    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // --- Permissions Logic ---
    const isAssignee = user?.id === task.assigned_to;
    const canComplete = isOwner || isAssignee;
    const canDelete = isOwner;

    // 1. Handlers
    const toggleStatus = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening the Update Modal when just checking the box
        if (!canComplete) return;

        updateTask({
            id: task.id,
            data: { is_completed: !task.is_completed },
            projectId: task.project,
        });
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteTask(task.id, {
            onSuccess: () => setIsDeleteOpen(false),
        });
    };

    // 2. Date Logic
    let dateText = "";
    let dateColor = "text-muted-foreground";

    if (task.due_date) {
        const date = new Date(task.due_date);
        if (isPast(date) && !isToday(date) && !task.is_completed) {
            dateText = "Overdue";
            dateColor = "text-red-600";
        } else if (isToday(date)) {
            dateText = "Today";
            dateColor = "text-orange-600";
        } else {
            dateText = format(date, "MMM d");
        }
    }

    return (
        <>
            <div
                onClick={() => onClick?.(task)}
                className="group flex items-start gap-3 p-3 bg-background border-b border-border/40 hover:bg-muted/30 transition-colors cursor-pointer"
            >
                {/* LEFT: Checkbox */}
                <button
                    onClick={toggleStatus}
                    disabled={!canComplete}
                    className={cn(
                        "mt-0.5 shrink-0 transition-colors rounded-full",
                        task.is_completed
                            ? "text-green-600"
                            : "text-muted-foreground/40",
                        canComplete
                            ? "hover:text-primary"
                            : "cursor-not-allowed opacity-50",
                    )}
                >
                    {task.is_completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                    ) : (
                        <Circle className="w-5 h-5" />
                    )}
                </button>

                {/* MIDDLE: Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span
                        className={cn(
                            "text-sm font-medium text-foreground transition-all",
                            task.is_completed &&
                                "text-muted-foreground line-through decoration-muted-foreground/50",
                        )}
                    >
                        {task.title}
                    </span>

                    {/* Meta Row */}
                    <div className="flex items-center gap-2 text-[11px]">
                        {task.due_date && (
                            <span
                                className={cn(
                                    "flex items-center gap-1",
                                    dateColor,
                                )}
                            >
                                <Calendar className="w-3 h-3" />
                                {dateText}
                            </span>
                        )}
                        {/* Show Assignee Name on mobile if no avatar is visible */}
                        {task.assigned_to_detail && (
                            <span className="text-muted-foreground sm:hidden">
                                • {task.assigned_to_detail.first_name}
                            </span>
                        )}
                    </div>
                </div>

                {/* RIGHT: Avatar & Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {task.assigned_to_detail && (
                        <div
                            title={`Assigned to ${task.assigned_to_detail.first_name}`}
                            className="opacity-100"
                        >
                            <UserAvatar
                                src={task.assigned_to_detail.avatar}
                                firstName={task.assigned_to_detail.first_name}
                                lastName={task.assigned_to_detail.last_name}
                            />
                        </div>
                    )}

                    {canDelete && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <Popover
                                open={isMenuOpen}
                                onOpenChange={setIsMenuOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-muted-foreground"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    className="w-32 p-1"
                                >
                                    <button
                                        onClick={handleDeleteClick}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        Delete
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>

            <DeleteTaskDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </>
    );
}
