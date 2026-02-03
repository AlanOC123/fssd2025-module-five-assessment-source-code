import { useState } from "react";
import { Plus, Loader2, Search } from "lucide-react";
import { Button, Input } from "@/components";
import { useProjectWorkspace } from "@/features/projects";
import { useGetTasks } from "../hooks";
import { CreateTaskForm, UpdateTaskForm } from "../forms"; // Import both
import { TaskList } from "../components/task-list";
import { cn } from "@/lib/utils";
import { FilterTasksPill } from "../components";
import { UserAvatar } from "@/features/users";
import { useDebounce } from "@/hooks";
import type { Task, TaskStatusFilter } from "../types"; // Import Task type

export function TasksPanel() {
    const { project, team } = useProjectWorkspace();

    // 1. State for Filters
    const [statusFilter, setStatusFilter] =
        useState<TaskStatusFilter>("active");
    const [assignedFilter, setAssignedFilter] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // 2. State for Modals
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Missing state added

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
        assigned_to: assignedFilter || undefined,
    });

    if (!project) return null;

    return (
        <div className="flex flex-col h-full bg-background relative">
            {/* --- HEADER & FILTERS --- */}
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

                {/* --- ASSIGNEE FILTERS --- */}
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
                                key={member.id}
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

            {/* --- TASK LIST --- */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <TaskList
                    tasks={tasks || []}
                    isLoading={isLoading}
                    onTaskClick={(task) => setSelectedTask(task)} // Correct prop name
                />
            </div>

            {/* --- MODALS --- */}
            <CreateTaskForm
                open={isCreateOpen}
                onOpenChange={setCreateOpen}
                project={project}
                members={team}
            />

            {selectedTask && (
                <UpdateTaskForm
                    task={selectedTask}
                    open={!!selectedTask}
                    onOpenChange={(open) => !open && setSelectedTask(null)}
                    members={team}
                />
            )}
        </div>
    );
}
