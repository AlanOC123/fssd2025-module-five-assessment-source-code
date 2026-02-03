import { useFormContext, Controller } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import type { TaskAssigneeInputProps } from "../types";

import {
    Field,
    FieldLabel,
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    Textarea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    DatePicker,
} from "@/components";

export function TaskTitleInput() {
    const name = "title";
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    const value = watch(name);
    const isValid = !errors[name] && value;

    return (
        <Field>
            <FieldLabel>Task Title</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    id={name}
                    placeholder="e.g. Redesign Homepage"
                    {...register(name)}
                    data-valid={isValid}
                    aria-invalid={!!errors[name]}
                />
                {isValid && (
                    <InputGroupAddon>
                        <CheckCircle className="text-success h-4 w-4" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {errors[name] && (
                <p className="text-error text-sm mt-1">
                    {errors[name]?.message as string}
                </p>
            )}
        </Field>
    );
}

export function TaskDescriptionInput() {
    const name = "description";
    const { register } = useFormContext();

    return (
        <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
                id={name}
                placeholder="Add details about this task..."
                {...register(name)}
                className="min-h-25"
            />
        </Field>
    );
}

export function TaskDueDateInput({ 
    minDate, 
    maxDate ,
    onUpdate
}: { 
    minDate?: Date, 
    maxDate?: Date,
    onUpdate: (date: string | null) => void
}) {
    const name = "due_date";
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Field>
                    <FieldLabel>Due Date</FieldLabel>
                    <DatePicker
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(date) => {
                            const dateString = date ? date.toISOString().split("T")[0] : "";
                            field.onChange(dateString);
                            onUpdate(dateString)
                        }}
                        disabled={(date: Date) => {
                            const isBefore = minDate ? date < minDate : false;
                            const isAfter = maxDate ? date > maxDate : false;
                            return isBefore || isAfter;
                        }}
                    />
                </Field>
            )}
        />
    );
}

export function TaskStatusCheckbox() {
    const name = "is_completed";
    const { register } = useFormContext();

    return (
        <div className="flex items-center gap-2 mt-4">
            <input
                type="checkbox"
                id={name}
                className="h-4 w-4 rounded border-gray-300"
                {...register(name)}
            />
            <label htmlFor={name} className="text-sm font-medium">
                Mark as Completed
            </label>
        </div>
    );
}

export function TaskAssigneeInput({ members }: TaskAssigneeInputProps) {
    const name = "assigned_to";
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Field>
                    <FieldLabel>Assign To</FieldLabel>
                    <Select
                        // Value must be a string for Select, but we send a number to API
                        value={field.value ? field.value.toString() : ""}
                        onValueChange={(val) => {
                            // "unassigned" is a special value to clear the field
                            const parsed =
                                val === "unassigned" ? null : parseInt(val, 10);
                            field.onChange(parsed);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="unassigned">
                                <span className="text-muted-foreground">
                                    Unassigned
                                </span>
                            </SelectItem>

                            {members.map((member) => (
                                <SelectItem
                                    key={member.id}
                                    value={member.id.toString()}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">
                                            {member.first_name?.[0]}
                                        </div>
                                        <span>
                                            {member.first_name}
                                            {member.last_name}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            )}
        />
    );
}