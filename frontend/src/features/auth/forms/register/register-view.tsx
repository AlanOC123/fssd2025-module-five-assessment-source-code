import type { RegisterViewProps } from "../../types";
import { FormProvider } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components";
import { PersonalStep, AccountStep, SecurityStep } from "./register-steps";

export function RegisterView({
    methods,
    currStep,
    handleNext,
    handlePrev,
    handleSubmit,
    isLoading,
}: RegisterViewProps) {
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
                        <SecurityStep
                            onPrev={handlePrev}
                            isLoading={isLoading}
                        />
                    </div>
                </Tabs>
            </form>
        </FormProvider>
    );
}
