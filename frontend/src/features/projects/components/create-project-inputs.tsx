import { useFormContext } from "react-hook-form";
import { CheckCircle } from "lucide-react";

import {
    Field,
    FieldLabel,
    Textarea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    DatePickerWithRange,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components";
import type { DateRange } from "react-day-picker";

export function TitleInput() {
    const name = "title";

    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <Field>
            <FieldLabel>Title</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    data-valid={showSuccessIcon}
                    aria-invalid={showError}
                    type="text"
                    placeholder={"Type Project Title"}
                    id={name}
                    {...register(name)}
                />
                {showSuccessIcon && (
                    <InputGroupAddon>
                        <CheckCircle className="text-success" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {showError && (
                <p className="text-error text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </Field>
    );
}

export function DescriptionInput() {
    const name = "description";

    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
                data-valid={showSuccessIcon}
                aria-invalid={showError}
                placeholder={"Type Project Description"}
                id={name}
                {...register(name)}
            />
        </Field>
    );
}

export function DateInput({
    date,
    setDate,
}: {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
}) {
    return (
        <Field>
            <FieldLabel>Start / End Dates (Optional)</FieldLabel>
            <DatePickerWithRange date={date} setDate={setDate} />
        </Field>
    );
}

export function StatusInput() {
    const name = "status";

    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();

    const value = watch("dateOfBirth");

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <Field>
            <FieldLabel>Status</FieldLabel>
            <Select {...register(name)}>
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                </SelectContent>
                {showSuccessIcon && (
                    <InputGroupAddon>
                        <CheckCircle className="text-success" />
                    </InputGroupAddon>
                )}
            </Select>
            {showError && (
                <p className="text-error text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </Field>
    );
}
