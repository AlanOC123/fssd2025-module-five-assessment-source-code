import { FormProvider } from "react-hook-form";
import type { UpdateTaskViewProps } from "../../types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    Button,
    FieldGroup,
    FieldSet,
} from "@/components";

import {
    TaskTitleInput,
    TaskDescriptionInput,
    TaskDueDateInput,
    TaskStatusCheckbox,
    TaskAssigneeInput,
} from "../../components/task-inputs";

export function UpdateTaskView({
    open,
    onOpenChange,
    methods,
    isPending,
    onSubmit,
    closeForm,
    members,
}: UpdateTaskViewProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6 py-4"
                    >
                        <FieldGroup>
                            <FieldSet>
                                <TaskTitleInput />
                                <TaskDescriptionInput />
                                <div className="flex flex-col gap-4">
                                    <TaskDueDateInput />
                                    <TaskStatusCheckbox />
                                    <div className="mt-4">
                                        <TaskAssigneeInput members={members} />
                                    </div>
                                </div>
                            </FieldSet>
                        </FieldGroup>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeForm}
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
