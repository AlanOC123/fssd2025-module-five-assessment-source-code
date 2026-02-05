import { useFormContext } from "react-hook-form";
import { useState } from "react";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
    FieldGroup,
    FieldLabel,
} from "@/components";

import {
    Mail,
    KeyRound,
    Eye,
    EyeOff,
    CheckCircle2,
    CalendarDays,
    User,
    AlertCircle,
} from "lucide-react";
import { cn } from "@/lib";

interface FormInputProps {
    name: string;
    label: string;
    placeholder: string;
}

/**
 * Shared helper to determine input state styles.
 * Returns classes for the InputGroup container based on validation state.
 */
const getInputStateClasses = (error: boolean, success: boolean) => {
    if (error) {
        return "border-destructive/80 ring-destructive/20 text-destructive focus-within:ring-destructive/30 bg-destructive/5";
    }
    if (success) {
        return "border-green-500/60 ring-green-500/20 text-green-600 dark:text-green-400 focus-within:ring-green-500/30 bg-green-500/5";
    }
    return "focus-within:border-primary focus-within:ring-primary/20 bg-background/50 hover:bg-background/80 transition-all duration-200";
};

export function NameInputGroup({ name, label, placeholder }: FormInputProps) {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const value = watch(name);

    const isError = !!(errors[name] && touchedFields[name]);
    const isSuccess = !errors[name] && value && value.length > 2; // Simple validation check

    return (
        <FieldGroup className="space-y-1.5">
            <FieldLabel
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >
                {label}
            </FieldLabel>
            <InputGroup
                className={cn(
                    "overflow-hidden rounded-lg border text-foreground",
                    getInputStateClasses(isError, isSuccess),
                )}
            >
                <InputGroupAddon className="px-3 text-muted-foreground/70">
                    <User
                        className={cn(
                            "h-4 w-4",
                            isError && "text-destructive",
                            isSuccess && "text-green-500",
                        )}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    id={name}
                    type="text"
                    placeholder={placeholder}
                    className="bg-transparent border-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-11"
                    aria-invalid={isError}
                    {...register(name)}
                />
                {isSuccess && (
                    <InputGroupAddon className="pr-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500 animate-in zoom-in spin-in-90 duration-300" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {isError && (
                <div className="flex items-center gap-2 text-destructive animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    <p className="text-xs font-medium">
                        {errors[name]?.message as string}
                    </p>
                </div>
            )}
        </FieldGroup>
    );
}

export function DateOfBirthInputGroup() {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();

    const name = "date_of_birth";
    const value = watch(name);

    const isError = !!(errors[name] && touchedFields[name]);
    const isSuccess = !errors[name] && value;

    return (
        <FieldGroup className="space-y-1.5">
            <FieldLabel
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >
                Date of Birth
            </FieldLabel>
            <InputGroup
                className={cn(
                    "overflow-hidden rounded-lg border",
                    getInputStateClasses(isError, isSuccess),
                )}
            >
                <InputGroupAddon className="px-3 text-muted-foreground/70">
                    <CalendarDays
                        className={cn(
                            "h-4 w-4",
                            isError && "text-destructive",
                            isSuccess && "text-green-500",
                        )}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    id={name}
                    type="date"
                    className="bg-transparent border-none focus-visible:ring-0 h-11 text-foreground"
                    aria-invalid={isError}
                    {...register(name)}
                />
                {isSuccess && (
                    <InputGroupAddon className="pr-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500 animate-in zoom-in duration-300" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {isError && (
                <div className="flex items-center gap-2 text-destructive animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    <p className="text-xs font-medium">
                        {errors[name]?.message as string}
                    </p>
                </div>
            )}
        </FieldGroup>
    );
}

export function EmailInputGroup({ name, label, placeholder }: FormInputProps) {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const value = watch(name);

    const isError = !!(errors[name] && touchedFields[name]);
    // Basic regex check for visual feedback only (React Hook Form handles real validation)
    const isSuccess =
        !errors[name] && value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    return (
        <FieldGroup className="space-y-1.5">
            <FieldLabel
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >
                {label}
            </FieldLabel>
            <InputGroup
                className={cn(
                    "overflow-hidden rounded-lg border",
                    getInputStateClasses(isError, isSuccess),
                )}
            >
                <InputGroupAddon className="px-3 text-muted-foreground/70">
                    <Mail
                        className={cn(
                            "h-4 w-4",
                            isError && "text-destructive",
                            isSuccess && "text-green-500",
                        )}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    id={name}
                    type="email"
                    placeholder={placeholder}
                    className="bg-transparent border-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-11 text-foreground"
                    aria-invalid={isError}
                    {...register(name)}
                />
                {isSuccess && (
                    <InputGroupAddon className="pr-3">
                        <CheckCircle2 className="h-4 w-4 text-green-500 animate-in zoom-in duration-300" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {isError && (
                <div className="flex items-center gap-2 text-destructive animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    <p className="text-xs font-medium">
                        {errors[name]?.message as string}
                    </p>
                </div>
            )}
        </FieldGroup>
    );
}

export function PasswordInputGroup({
    name,
    label,
    placeholder,
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();

    const value = watch(name);
    const isError = !!(errors[name] && touchedFields[name]);
    // Only show green success check if no errors and length > 5
    const isSuccess = !errors[name] && value && value.length > 5;

    return (
        <FieldGroup className="space-y-1.5">
            <FieldLabel
                htmlFor={name}
                className="text-sm font-medium text-foreground"
            >
                {label}
            </FieldLabel>
            <InputGroup
                className={cn(
                    "overflow-hidden rounded-lg border",
                    getInputStateClasses(isError, isSuccess),
                )}
            >
                <InputGroupAddon className="px-3 text-muted-foreground/70">
                    <KeyRound
                        className={cn(
                            "h-4 w-4",
                            isError && "text-destructive",
                            isSuccess && "text-green-500",
                        )}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="bg-transparent border-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-11"
                    aria-invalid={isError}
                    {...register(name)}
                />

                {/* Toggle Password Visibility Button */}
                <InputGroupButton
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="hover:bg-transparent text-muted-foreground hover:text-foreground h-11 w-11"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </InputGroupButton>
            </InputGroup>
            {isError && (
                <div className="flex items-center gap-2 text-destructive animate-in slide-in-from-top-1">
                    <AlertCircle className="h-3 w-3" />
                    <p className="text-xs font-medium">
                        {errors[name]?.message as string}
                    </p>
                </div>
            )}
        </FieldGroup>
    );
}
