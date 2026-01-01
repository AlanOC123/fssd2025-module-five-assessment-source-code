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
    CheckCircle,
} from "lucide-react";
import { cn } from "@/lib";

export function EmailInputGroup() {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const name = "email";
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <FieldGroup>
            <FieldLabel htmlFor={name}>Email</FieldLabel>
            <InputGroup>
                <InputGroupAddon>
                    <Mail
                        className={cn(
                            showSuccessIcon
                                ? "text-success"
                                : showError
                                ? "text-error"
                                : ""
                        )}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    type="email"
                    placeholder={"name@example.com"}
                    className={cn(
                        showSuccessIcon
                            ? "text-success"
                            : showError
                            ? "text-error"
                            : ""
                    )}
                    id={name}
                    data-valid={showSuccessIcon}
                    aria-invalid={showError}
                    {...register(name)}
                />
                {showSuccessIcon && (
                    <InputGroupAddon>
                        <CheckCircle className="text-success" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {showError && (
                <p className="text-destructive text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </FieldGroup>
    );
}

export function PasswordInputGroup() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const name = "password";
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <FieldGroup>
            <FieldLabel htmlFor={name}>Password</FieldLabel>
            <InputGroup>
                <InputGroupAddon>
                    <KeyRound
                        className={cn(
                            showSuccessIcon
                                ? "text-success"
                                : showError
                                ? "text-error"
                                : ""
                        )}
                    />
                </InputGroupAddon>
                <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder={"Type Password"}
                    className={cn(
                        showSuccessIcon
                            ? "text-success"
                            : showError
                            ? "text-error"
                            : ""
                    )}
                    data-valid={showSuccessIcon}
                    aria-invalid={showError}
                    id={name}
                    {...register(name)}
                />
                {showSuccessIcon && (
                    <InputGroupAddon>
                        <CheckCircle className="text-success" />
                    </InputGroupAddon>
                )}
                <InputGroupButton
                    variant={"ghost"}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
            </InputGroup>
            {showError && (
                <p className="text-destructive text-sm">
                    {errors[name]?.message as string}
                </p>
            )}
        </FieldGroup>
    );
}
