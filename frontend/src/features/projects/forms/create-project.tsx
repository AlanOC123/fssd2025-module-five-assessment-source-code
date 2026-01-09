import { useState, useEffect, useRef } from "react";

import {
    Sheet,
    SheetContent,
    Button,
    SheetFooter,
    SheetClose,
    FieldGroup,
    FieldLegend,
    FieldDescription,
    FieldSet,
    FieldSeparator,
    Spinner,
} from "@/components";

import {
    CreateProjectFormHeader,
    DescriptionInput,
    TitleInput,
    DateInput,
    StatusInput,
    CreateProjectButton,
} from "../components";

import { useCreateProject } from "../hooks/use-create-project";

import { createProjectSchema, type CreateProjectData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useApp } from "@/hooks";

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

    const hiddenCloseRef = useRef<HTMLButtonElement>(null);

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

    async function submitProjectDTO(payload: CreateProjectData) {
        createProject(payload, {
            onSuccess: () => {
                closeForm();
            },
        });
    }

    return (
        <Sheet open={isCreateProjectOpen} onOpenChange={toggleCreateProject}>
            <SheetContent className="w-full" side="right">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(submitProjectDTO)}
                        className="overflow-y-auto h-full w-full flex flex-col"
                    >
                        <CreateProjectFormHeader />
                        <FieldGroup className="p-4 flex-1">
                            <FieldSet>
                                <FieldGroup>
                                    <TitleInput />
                                    <DescriptionInput />
                                </FieldGroup>
                            </FieldSet>
                            <FieldSeparator />
                            <FieldSet>
                                <FieldLegend>
                                    Additional Information
                                </FieldLegend>
                                <FieldDescription>
                                    Add any additional information for the
                                    project here. You can update this later
                                    also.
                                </FieldDescription>
                                <DateInput
                                    date={dateRange}
                                    setDate={setDateRange}
                                />
                                <StatusInput />
                            </FieldSet>
                        </FieldGroup>

                        <SheetFooter>
                            <Button type="submit">Create Project</Button>
                            <SheetClose asChild>
                                <Button
                                    onClick={closeForm}
                                    variant="destructive"
                                >
                                    Cancel
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <button
                                    ref={hiddenCloseRef}
                                    className="hidden"
                                />
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </FormProvider>
            </SheetContent>
        </Sheet>
    );
}
