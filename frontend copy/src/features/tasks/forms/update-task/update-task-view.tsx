import { FormProvider } from "react-hook-form";
import { ResponsiveModal } from "@/components";
import { FieldGroup, FieldSet, Input, Textarea, Label } from "@/components/ui";
import { TaskDueDateInput, TaskAssigneeInput } from "../../components";
import type { UpdateTaskViewProps } from "../../types";

export function UpdateTaskView({
    open,
    onOpenChange,
    methods,
    members,
    minDate,
    maxDate,
    onUpdate,
}: UpdateTaskViewProps) {
    return (
        <ResponsiveModal
            title="Task Details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <FormProvider {...methods}>
                <div className="space-y-6 py-4">
                    <FieldGroup>
                        <FieldSet>
                            {/* --- TITLE --- */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">
                                    Task Title
                                </Label>
                                <Input
                                    {...methods.register("title")}
                                    onBlur={(e) =>
                                        onUpdate("title", e.target.value)
                                    }
                                    className="border-transparent hover:border-input focus:bg-muted/30 transition-all text-base font-medium shadow-none px-2"
                                />
                            </div>

                            {/* --- DATE & ASSIGNEE --- */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">
                                        Due Date
                                    </Label>
                                    <TaskDueDateInput
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        onUpdate={(val) =>
                                            onUpdate("due_date", val)
                                        }
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">
                                        Assignee
                                    </Label>
                                    <TaskAssigneeInput
                                        members={members}
                                        onUpdate={(val) =>
                                            onUpdate("assigned_to", val)
                                        }
                                    />
                                </div>
                            </div>

                            {/* --- DESCRIPTION --- */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">
                                    Description
                                </Label>
                                <Textarea
                                    {...methods.register("description")}
                                    onBlur={(e) =>
                                        onUpdate("description", e.target.value)
                                    }
                                    className="min-h-[150px] bg-muted/10 border-transparent focus:bg-background transition-all resize-none shadow-none p-3"
                                    placeholder="Add details about this task..."
                                />
                            </div>
                        </FieldSet>
                    </FieldGroup>
                </div>
            </FormProvider>
        </ResponsiveModal>
    );
}
