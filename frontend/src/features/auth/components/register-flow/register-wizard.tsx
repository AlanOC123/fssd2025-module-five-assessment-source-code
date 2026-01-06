import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalStep, AccountStep, SecurityStep } from "./register-steps";
import { Tabs, TabsList, TabsTrigger } from "@/components";

import {
    addItemToStorage,
    getItemFromStorage,
    type StorageConfig,
} from "@/utils";

import {
    registerSchema,
    type RegisterFormData,
    type RegisterStep,
} from "./schema";

const SAVEABLE_FIELDS: (keyof StorageConfig["auth_items"])[] = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "email",
];

import { postRegister } from "../../api";

type SaveableKey = keyof StorageConfig["auth_items"];
const isSaveableField = (key: string): key is SaveableKey => {
    return (SAVEABLE_FIELDS as string[]).includes(key)
}

export function RegisterWizard() {
    const [currStep, setCurrStep] = useState<RegisterStep>("personal");

    const methods = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",

        defaultValues: {
            "firstName": getItemFromStorage("auth_items", "firstName") ?? "",
            "lastName": getItemFromStorage("auth_items", "lastName") ?? "",
            "dateOfBirth": getItemFromStorage("auth_items", "dateOfBirth") ?? "",
            "email": getItemFromStorage("auth_items", "email") ?? "",
        }
    });

    const processStep = async (
        step: RegisterStep,
        fieldsToValidate: (keyof RegisterFormData)[]
    ) => {
        const isValid = await methods.trigger(fieldsToValidate);
        if (isValid) {
            const currValues = methods.getValues();
            fieldsToValidate.forEach(key => {
                if (isSaveableField(key)) {
                    const value = currValues[key];
                    
                    if (value) {
                        addItemToStorage("auth_items", key, value)
                    }
                }
            })
            setCurrStep(step);
        }
    };

    const handleNext = async () => {
        let fieldsToValidate: (keyof RegisterFormData)[] = [
            "firstName",
            "lastName",
            "dateOfBirth",
        ];

        let nextStep: RegisterStep = "account";

        if (currStep === "account") {
            fieldsToValidate = ["email", "confirmEmail"];
            nextStep = "security"
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

    const handleSubmit = async (payload: RegisterFormData) => {
        try {
            const { response } = await postRegister(payload);
            console.log(response);
        } catch (err) {
            const { response } = err;
            const { data } = response;
            console.log(data);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                className="min-w-xs max-w-xl w-4/5 h-3/5 z-1 grid grid-rows-[1fr_auto] gap-8"
            >
                <Tabs
                    value={currStep}
                    className="grid grid-rows-[auto_1fr] gap-y-4 h-full items-start"
                >
                    <TabsList className="flex items-center justify-center gap-4 w-full">
                        <TabsTrigger
                            value="personal"
                            disabled={currStep !== "personal"}
                        >
                            Personal
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            disabled={currStep !== "account"}
                        >
                            Account
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            disabled={currStep !== "security"}
                        >
                            Security
                        </TabsTrigger>
                    </TabsList>
                    <div className="h-full grid items-start">
                        <PersonalStep onNext={handleNext} />
                        <AccountStep onNext={handleNext} onPrev={handlePrev} />
                        <SecurityStep onPrev={handlePrev} />
                    </div>
                </Tabs>
            </form>
        </FormProvider>
    );
}
