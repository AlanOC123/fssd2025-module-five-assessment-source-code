import type { TaskListProps } from "../types";
import { TaskCard } from "./task-card";

export function TaskList({ tasks, isLoading, onTaskClick }: TaskListProps) {
    if (isLoading) {
        return (
            <div className="py-10 text-center text-muted-foreground">
                Loading tasks...
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
                <div className="p-3 rounded-full bg-muted mb-3">
                    <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-medium">No tasks yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs text-center mt-1">
                    Get started by creating a new task for this project.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    // Use the correct prop name from our TaskListProps interface
                    onClick={onTaskClick}
                />
            ))}
        </div>
    );
}
