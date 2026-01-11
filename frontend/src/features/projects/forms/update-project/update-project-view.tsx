import { FormProvider } from "react-hook-form";
import { type UpdateProjectViewProps } from "../../types";

import {
    FieldGroup,
    FieldSet,
    FieldLegend,
    FieldDescription,
    FieldSeparator,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    Button
} from "@/components";

import {
    TitleInput,
    DescriptionInput,
    StatusInput,
    DateInput,
} from "../../components/create-project-inputs";

export function UpdateProjectView({
    methods,
    open,
    onOpenChange,
    isPending,
    dateRange,
    setDateRange,
    closeForm,
    onSubmit,
}: UpdateProjectViewProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>
                        Make changes to your project details here. Click save
                        when you're done.
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="flex flex-col gap-6 py-4"
                    >
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <TitleInput />
                                    <DescriptionInput />
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Project Details</FieldLegend>
                                <FieldDescription>
                                    Update timeline and status.
                                </FieldDescription>
                                <DateInput
                                    date={dateRange}
                                    setDate={setDateRange}
                                />
                                <StatusInput />
                            </FieldSet>
                        </FieldGroup>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeForm}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
