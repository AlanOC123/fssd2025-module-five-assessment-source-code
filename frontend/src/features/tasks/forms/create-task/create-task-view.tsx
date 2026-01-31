import type { CreateTaskViewProps } from "../../types";
import { FormProvider } from "react-hook-form";

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
    TaskAssigneeInput
} from "../../components/task-inputs";

export function CreateTaskView({
    open,
    onOpenChange,
    methods,
    isPending,
    onSubmit,
    closeForm,
    members
}: CreateTaskViewProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <TaskDueDateInput />
                                    <TaskAssigneeInput members={members} />
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
                                {isPending ? "Creating..." : "Create Task"}
                            </Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}
