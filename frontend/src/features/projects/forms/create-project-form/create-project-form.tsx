import { useCreateProject } from "../../hooks";
import { useApp } from "@/hooks";
import { useForm } from "react-hook-form";
import type { CreateProjectData } from "../../types";
import { createProjectSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CreateProjectView } from "./create-project-view";

export function CreateProjectForm() {
    const { mutate: createProject, isPending } = useCreateProject();

    const { isCreateProjectOpen, closeCreateProject, toggleCreateProject } =
        useApp();

    const methods = useForm<CreateProjectData>({
        resolver: zodResolver(createProjectSchema),
        mode: "onChange",

        defaultValues: {
            status: "pending",
        },
    });

    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    useEffect(() => {
        if (dateRange?.to) {
            methods.setValue("end_date", format(dateRange.to, "yyyy-MM-dd"));
        }

        if (dateRange?.from) {
            methods.setValue(
                "start_date",
                format(dateRange.from, "yyyy-MM-dd")
            );
        }
    }, [dateRange, methods]);

    function closeForm() {
        methods.reset();
        setDateRange(undefined);
        closeCreateProject();
    }

    async function handleSubmit(payload: CreateProjectData) {
        createProject(payload, {
            onSuccess: () => {
                closeForm();
            },
        });
    }

    return (
        <CreateProjectView
            methods={methods}
            open={isCreateProjectOpen}
            onOpenChange={toggleCreateProject}
            isPending={isPending}
            dateRange={dateRange}
            setDateRange={setDateRange}
            closeForm={closeForm}
            onSubmit={handleSubmit}
        />
    );
}
