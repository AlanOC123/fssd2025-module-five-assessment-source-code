import type { CreateProjectViewProps } from "../../types";

import {
    Sheet,
    SheetContent,
    FieldGroup,
    FieldSet,
    FieldSeparator,
    FieldLegend,
    FieldDescription,
    SheetFooter,
    SheetClose,
    Button,
} from "@/components";

import {
    TitleInput,
    CreateProjectFormHeader,
    DescriptionInput,
    DateInput,
    StatusInput,
} from "../../components";

import { FormProvider } from "react-hook-form";

export function CreateProjectView({
    methods,
    open,
    onOpenChange,
    onSubmit,
    dateRange,
    setDateRange,
    closeForm,
    isPending
}: CreateProjectViewProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full z-101" side="right">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
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
                            <Button type="submit">{ isPending ? "Creating Project..." : "Create Project" }</Button>
                            <SheetClose asChild>
                                <Button
                                    onClick={closeForm}
                                    variant="destructive"
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </FormProvider>
            </SheetContent>
        </Sheet>
    );
}
