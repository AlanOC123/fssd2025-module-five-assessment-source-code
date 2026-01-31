import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../../hooks";
import { createTaskSchema } from "../schema";
import type { CreateTaskData, CreateTaskFormProps } from "../../types";
import { CreateTaskView } from "./create-task-view";
import { useProjectWorkspace } from "@/features/projects";

export function CreateTaskForm({
    open,
    onOpenChange,
    projectId,
}: CreateTaskFormProps) {
    const { team } = useProjectWorkspace();
    const { mutate: createTask, isPending } = useCreateTask();

    const methods = useForm<CreateTaskData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            project: projectId,
            due_date: "",
            assigned_to: undefined, // Default to unassigned
        },
    });

    function closeForm() {
        methods.reset();
        onOpenChange(false);
    }

    const handleSubmit = (data: CreateTaskData) => {
        const payload = { ...data, project: projectId };

        createTask(payload, {
            onSuccess: () => {
                closeForm();
            },
        });
    };

    return (
        <CreateTaskView
            open={open}
            onOpenChange={onOpenChange}
            methods={methods}
            isPending={isPending}
            onSubmit={handleSubmit}
            closeForm={closeForm}
            members={team}
        />
    );
}
