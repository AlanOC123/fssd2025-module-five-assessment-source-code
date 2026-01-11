import { useUpdateProject } from "../../hooks";
import { useApp } from "@/hooks";
import { useForm } from "react-hook-form";
import type { UpdateProjectData, UpdateProjectFormProps } from "../../types";
import { updateProjectSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { UpdateProjectView } from "./update-project-view";

export function UpdateProjectForm({
    open,
    onOpenChange,
    project,
}: UpdateProjectFormProps) {
    const { mutate: updateProject, isPending } = useUpdateProject();

    const methods = useForm<UpdateProjectData>({
        resolver: zodResolver(updateProjectSchema),
        mode: "onChange",

        defaultValues: {
            title: project.title,
            description: project.description || "",
            start_date: project.start_date || "",
            end_date: project.end_date || "",
            status: project.status,
        },
    });

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: project.start_date ? new Date(project.start_date) : undefined,
        to: project.end_date ? new Date(project.end_date) : undefined,
    });

    useEffect(() => {
        const changeProject = () => {
            if (project) {
                methods.reset({
                    title: project.title,
                    description: project.description || "",
                    status: project.status,
                });
                setDateRange({
                    from: project.start_date
                        ? new Date(project.start_date)
                        : undefined,
                    to: project.end_date
                        ? new Date(project.end_date)
                        : undefined,
                });
            }
        };

        changeProject();
    }, [project, methods]);

    useEffect(() => {
        // 1. Handle Start Date
        if (dateRange?.from) {
            methods.setValue(
                "start_date",
                format(dateRange.from, "yyyy-MM-dd"),
                {
                    shouldValidate: true,
                    shouldDirty: true,
                }
            );
        } else {
            // Important: If it's undefined, we must explicitly clear the form field
            methods.setValue("start_date", "", { shouldDirty: true });
        }

        // 2. Handle End Date
        if (dateRange?.to) {
            methods.setValue("end_date", format(dateRange.to, "yyyy-MM-dd"), {
                shouldValidate: true,
                shouldDirty: true,
            });
        } else {
            methods.setValue("end_date", "", { shouldDirty: true });
        }
    }, [dateRange, methods]);

    function closeForm() {
        methods.reset();
        setDateRange(undefined);
        onOpenChange(false);
    }

    async function handleSubmit(data: UpdateProjectData) {
        console.log(data);
        updateProject(
            { id: project.id, data },
            {
                onSuccess: () => {
                    closeForm();
                },
            }
        );
    }

    return (
        <UpdateProjectView
            methods={methods}
            open={open}
            onOpenChange={onOpenChange}
            isPending={isPending}
            dateRange={dateRange}
            setDateRange={setDateRange}
            onSubmit={handleSubmit}
            closeForm={closeForm}
        />
    );
}
