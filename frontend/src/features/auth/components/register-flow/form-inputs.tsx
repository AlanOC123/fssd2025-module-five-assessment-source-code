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
    MailCheck,
    KeyRound,
    BadgeCheck,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react";
import { cn } from "@/lib";

export function NameInputGroup({ isFirst }: { isFirst: boolean }) {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const name = isFirst ? "firstName" : "lastName";
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <FieldGroup>
            <FieldLabel htmlFor={name}>
                {isFirst ? "First Name" : "Last Name"}
            </FieldLabel>
            <InputGroup>
                <InputGroupInput
                    className={cn(
                        showSuccessIcon
                            ? "text-success"
                            : showError
                            ? "text-error"
                            : ""
                    )}
                    data-valid={showSuccessIcon}
                    aria-invalid={showError}
                    type="text"
                    placeholder={isFirst ? "Type First Name" : "Type Last Name"}
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
        </FieldGroup>
    );
}

export function DateOfBirthInputGroup() {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();

    const value = watch("dateOfBirth");

    const showSuccessIcon =
        !errors["dateOfBirth"] && value && typeof value === "string";
    const showError = errors["dateOfBirth"] && touchedFields["dateOfBirth"];

    return (
        <FieldGroup>
            <FieldLabel htmlFor={`dateOfBirth`}>Date of Birth</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    type="date"
                    id={`dateOfBirth`}
                    className={cn(
                        showSuccessIcon
                            ? "text-success"
                            : showError
                            ? "text-error"
                            : ""
                    )}
                    data-valid={showSuccessIcon}
                    aria-invalid={showError}
                    {...register("dateOfBirth")}
                />
                {showSuccessIcon && (
                    <InputGroupAddon>
                        <CheckCircle className="text-success" />
                    </InputGroupAddon>
                )}
            </InputGroup>
            {showError && (
                <p className="text-destructive text-sm">
                    {errors["dateOfBirth"]?.message as string}
                </p>
            )}
        </FieldGroup>
    );
}

export function EmailInputGroup({ isConfirm }: { isConfirm: boolean }) {
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const name = isConfirm ? "confirmEmail" : "email";
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <FieldGroup>
            <FieldLabel htmlFor={name}>
                {isConfirm ? "Email Confirmation" : "Email"}
            </FieldLabel>
            <InputGroup>
                <InputGroupAddon>
                    {isConfirm ? (
                        <MailCheck
                            className={cn(
                                showSuccessIcon
                                    ? "text-success"
                                    : showError
                                    ? "text-error"
                                    : ""
                            )}
                        />
                    ) : (
                        <Mail
                            className={cn(
                                showSuccessIcon
                                    ? "text-success"
                                    : showError
                                    ? "text-error"
                                    : ""
                            )}
                        />
                    )}
                </InputGroupAddon>
                <InputGroupInput
                    type="email"
                    placeholder={
                        isConfirm ? "Type Email Again" : "name@example.com"
                    }
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

export function PasswordInputGroup({ isConfirm }: { isConfirm: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors, touchedFields },
        watch,
    } = useFormContext();
    const name = isConfirm ? "confirmPassword" : "password";
    const value = watch(name);

    const showSuccessIcon = !errors[name] && value && typeof value === "string";
    const showError = errors[name] && touchedFields[name];

    return (
        <FieldGroup>
            <FieldLabel htmlFor={name}>
                {isConfirm ? "Password Confirmation" : "Password"}
            </FieldLabel>
            <InputGroup>
                <InputGroupAddon>
                    {isConfirm ? (
                        <BadgeCheck
                            className={cn(
                                showSuccessIcon
                                    ? "text-success"
                                    : showError
                                    ? "text-error"
                                    : ""
                            )}
                        />
                    ) : (
                        <KeyRound
                            className={cn(
                                showSuccessIcon
                                    ? "text-success"
                                    : showError
                                    ? "text-error"
                                    : ""
                            )}
                        />
                    )}
                </InputGroupAddon>
                <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder={
                        isConfirm ? "Type Password Again" : "Type Password"
                    }
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
