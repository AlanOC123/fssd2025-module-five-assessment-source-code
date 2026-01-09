import type { RegisterUserData, RegisterStep, SaveableKey } from "../../types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "../schema";
import { RegisterView } from "./register-view";
import { useAuth } from "../../hooks";
import {
    addItemToStorage,
    getItemFromStorage,
} from "@/utils";

import type { StorageConfig } from "@/types";

const SAVEABLE_FIELDS: (keyof StorageConfig["auth_items"])[] = [
    "first_name",
    "last_name",
    "date_of_birth",
    "email",
];

const isSaveableField = (key: string): key is SaveableKey => {
    return (SAVEABLE_FIELDS as string[]).includes(key);
};

export function RegisterForm() {
    const [currStep, setCurrStep] = useState<RegisterStep>("personal");

    const { register, isLoading } = useAuth();

    const methods = useForm<RegisterUserData>({
        resolver: zodResolver(registerUserSchema),
        mode: "onChange",

        defaultValues: {
            first_name: getItemFromStorage("auth_items", "first_name") ?? "",
            last_name: getItemFromStorage("auth_items", "last_name") ?? "",
            date_of_birth:
                getItemFromStorage("auth_items", "date_of_birth") ?? "",
            email: getItemFromStorage("auth_items", "email") ?? "",
            confirm_email: "",
            password1: "",
            password2: "",
        },
    });

    const processStep = async (
        step: RegisterStep,
        fieldsToValidate: (keyof RegisterUserData)[]
    ) => {
        const isValid = await methods.trigger(fieldsToValidate);
        if (isValid) {
            const currValues = methods.getValues();
            fieldsToValidate.forEach((key) => {
                if (isSaveableField(key)) {
                    const value = currValues[key];

                    if (value) {
                        addItemToStorage("auth_items", key, value);
                    }
                }
            });
            setCurrStep(step);
        }
    };

    const handleNext = async () => {
        let fieldsToValidate: (keyof RegisterUserData)[] = [
            "first_name",
            "last_name",
            "date_of_birth",
        ];

        let nextStep: RegisterStep = "account";

        if (currStep === "account") {
            fieldsToValidate = ["email", "confirm_email"];
            nextStep = "security";
        }

        await processStep(nextStep, fieldsToValidate);
    };

    const handlePrev = async () => {
        if (currStep === "security") {
            setCurrStep("account");
        } else {
            setCurrStep("personal");
        }
    };

    const handleSubmit = (payload: RegisterUserData) => {
        register(payload);
    };

    return (
        <RegisterView
            methods={methods}
            currStep={currStep}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
}
