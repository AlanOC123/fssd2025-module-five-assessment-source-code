import { useState } from "react";
import { Plus, Loader2, Search } from "lucide-react";
import { Button, Input } from "@/components";
import { useProjectWorkspace } from "@/features/projects";
import { useGetTasks } from "../hooks";
import { CreateTaskForm } from "../forms"; // You might need to adjust this import path
import { TaskList } from "../components/task-list"; // Or a new workspace-specific list
import { cn } from "@/lib/utils";
import { FilterTasksPill } from "../components";
import type { TaskStatusFilter } from "../types";
import { UserAvatar } from "@/features/users";
import { useDebounce } from "@/hooks";

export function TasksPanel() {
    const { project, team } = useProjectWorkspace();

    const [statusFilter, setStatusFilter] =
        useState<TaskStatusFilter>("active");
    // ✅ Change: We are now storing the Profile ID (number)
    const [assignedFilter, setAssignedFilter] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setCreateOpen] = useState(false);

    const debouncedSearch = useDebounce(searchQuery, 500);

    const { data: tasks, isLoading } = useGetTasks({
        project: project?.id,
        search: debouncedSearch,
        is_completed:
            statusFilter === "completed"
                ? true
                : statusFilter === "active"
                  ? false
                  : undefined,
        // ✅ This now correctly sends the Profile ID
        assigned_to: assignedFilter || undefined,
    });

    if (!project) return null;

    return (
        <div className="flex flex-col h-full bg-background relative">
            <div className="px-6 py-4 border-b flex flex-col gap-4 shrink-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Tasks
                    </h2>
                    <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => setCreateOpen(true)}
                    >
                        <Plus className="w-4 h-4" />
                        New Task
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex p-1 bg-muted/20 rounded-lg border">
                        <FilterTasksPill
                            label="Active"
                            isActive={statusFilter === "active"}
                            onClick={() => setStatusFilter("active")}
                        />
                        <FilterTasksPill
                            label="Done"
                            isActive={statusFilter === "completed"}
                            onClick={() => setStatusFilter("completed")}
                        />
                        <FilterTasksPill
                            label="All"
                            isActive={statusFilter === "all"}
                            onClick={() => setStatusFilter("all")}
                        />
                    </div>

                    <div className="relative flex-1 max-w-[200px]">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-9 pl-9 bg-muted/10 border-transparent focus:bg-background focus:border-input transition-all"
                        />
                    </div>
                </div>

                {team.length > 1 && (
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar pb-1">
                        <span className="text-xs font-medium text-muted-foreground mr-1">
                            Assignee:
                        </span>

                        <button
                            onClick={() => setAssignedFilter(null)}
                            className={cn(
                                "flex items-center justify-center px-3 h-8 rounded-full text-xs font-medium transition-colors border shrink-0",
                                assignedFilter === null
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background text-muted-foreground border-dashed hover:border-solid hover:text-foreground",
                            )}
                        >
                            All
                        </button>

                        {team.map((member) => (
                            <button
                                // ✅ Key by Profile ID
                                key={member.id}
                                // ✅ Store Profile ID in state
                                onClick={() =>
                                    setAssignedFilter((prev) =>
                                        prev === member.id ? null : member.id,
                                    )
                                }
                                className={cn(
                                    "rounded-full transition-all shrink-0 border-2 relative",
                                    assignedFilter === member.id
                                        ? "border-primary ring-2 ring-primary/20 scale-105 z-10"
                                        : "border-transparent opacity-70 hover:opacity-100 grayscale hover:grayscale-0",
                                )}
                                title={`Filter by ${member.first_name} ${member.last_name}`}
                            >
                                <div className="h-8 w-8">
                                    <UserAvatar
                                        src={member.avatar}
                                        firstName={member.first_name}
                                        lastName={member.last_name}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="space-y-1">
                        {tasks?.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground text-sm">
                                No tasks found in this view.
                            </div>
                        ) : (
                            <TaskList tasks={tasks || []} isLoading={false} />
                        )}
                    </div>
                )}
            </div>

            <CreateTaskForm
                open={isCreateOpen}
                onOpenChange={setCreateOpen}
                projectId={project.id}
            />
        </div>
    );
}