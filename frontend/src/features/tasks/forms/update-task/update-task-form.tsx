import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTask } from "../../hooks";
import type { UpdateTaskData, UpdateTaskFormProps } from "../../types";
import { updateTaskSchema } from "../schema";
import { UpdateTaskView } from "./update-task-view";

export function UpdateTaskForm({ open, onOpenChange, task, members = [] }: UpdateTaskFormProps) {
    const { mutate: updateTask, isPending } = useUpdateTask();

    const methods = useForm<UpdateTaskData>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            due_date: "",
            assigned_to: null,
            is_completed: false,
        },
    });

    // Reset form when the task changes or modal opens
    useEffect(() => {
        if (task) {
            methods.reset({
                title: task.title,
                description: task.description || "",
                due_date: task.due_date || "",
                assigned_to: task.assigned_to,
                is_completed: task.is_completed,
            });
        }
    }, [task, methods]);

    function closeForm() {
        methods.reset();
        onOpenChange(false);
    }

    const handleSubmit = (data: UpdateTaskData) => {
        if (!task) return;

        updateTask(
            { id: task.id, data },
            {
                onSuccess: () => {
                    closeForm();
                },
            }
        );
    };

    if (!task) return null;

    return (
        <UpdateTaskView
            open={open}
            onOpenChange={onOpenChange}
            methods={methods}
            isPending={isPending}
            onSubmit={handleSubmit}
            closeForm={closeForm}
            members={members}
        />
    );
}
