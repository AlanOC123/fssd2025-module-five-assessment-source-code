import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjectWorkspace } from "@/features/projects";
import { useUpdateTask } from "../../hooks";
import { updateTaskSchema } from "../schema";
import { UpdateTaskView } from "./update-task-view";
import type { UpdateTaskFormProps, UpdateTaskData } from "../../types";

export function UpdateTaskForm({
    task,
    open,
    onOpenChange,
    members,
}: UpdateTaskFormProps) {
    const { project } = useProjectWorkspace();
    const { mutate: updateTask, isPending } = useUpdateTask();

    // 1. Initialize Form
    const methods = useForm<UpdateTaskData>({
        resolver: zodResolver(updateTaskSchema),
        values: {
            title: task?.title ?? "",
            description: task?.description ?? "",
            due_date: task?.due_date ?? null,
            assigned_to: task?.assigned_to ?? null,
            is_completed: task?.is_completed ?? false,
        },
    });

    // 2. Handle Logic-based persistence (Live Save)
const handleFieldUpdate = <K extends keyof UpdateTaskData>(
    field: K,
    value: UpdateTaskData[K],
) => {
    if (!task) return;

    const currentTaskValue = (task as UpdateTaskData)[field];

    if (value === currentTaskValue) return;

    updateTask({
        id: task.id,
        data: { [field]: value },
        projectId: task.project,
    });
};
    // 3. Prep Date Constraints
    const minDate = project?.start_date
        ? new Date(project.start_date)
        : undefined;
    const maxDate = project?.end_date ? new Date(project.end_date) : undefined;

    const closeForm = () => {
        onOpenChange(false);
    };

    // Return null if no task is selected to prevent hook/form collisions
    if (!task) return null;

    return (
        <UpdateTaskView
            open={open}
            onOpenChange={onOpenChange}
            methods={methods}
            isPending={isPending}
            closeForm={closeForm}
            members={members}
            minDate={minDate}
            maxDate={maxDate}
            onUpdate={handleFieldUpdate}
        />
    );
}
