import type { RegisterViewProps } from "../../types";
import { FormProvider } from "react-hook-form";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    FieldLegend,
    FieldDescription,
} from "@/components";
import { PersonalStep, AccountStep, SecurityStep } from "./register-steps";
import { User, Building, ShieldCheck } from "lucide-react"; // Icons for steps
import { cn } from "@/lib/utils";

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
                // Design Update: Consistent Glassmorphism Card
                className="w-full max-w-lg bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-500"
            >
                {/* Header Section */}
                <div className="text-center space-y-2 mb-6">
                    <FieldLegend className="text-3xl font-bold tracking-tight text-foreground">
                        Create Account
                    </FieldLegend>
                    <FieldDescription className="text-muted-foreground text-base">
                        Join Opus to manage your projects efficiently
                    </FieldDescription>
                </div>

                <Tabs value={currStep} className="w-full space-y-6">
                    {/* Progress Tracker / Tabs List */}
                    <TabsList className="w-full grid grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger
                            value="personal"
                            disabled={currStep !== "personal"}
                            className={cn(
                                "flex items-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg",
                                currStep === "personal"
                                    ? "text-primary"
                                    : "text-muted-foreground",
                            )}
                        >
                            <User className="w-4 h-4" />
                            <span className="hidden sm:inline">Personal</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="account"
                            disabled={currStep !== "account"}
                            className={cn(
                                "flex items-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg",
                                currStep === "account"
                                    ? "text-primary"
                                    : "text-muted-foreground",
                            )}
                        >
                            <Building className="w-4 h-4" />
                            <span className="hidden sm:inline">Account</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            disabled={currStep !== "security"}
                            className={cn(
                                "flex items-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg",
                                currStep === "security"
                                    ? "text-primary"
                                    : "text-muted-foreground",
                            )}
                        >
                            <ShieldCheck className="w-4 h-4" />
                            <span className="hidden sm:inline">Security</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Step Content Area */}
                    <div className="relative min-h-[300px] mt-2">
                        {/* We use specific animations for step transitions here if needed, 
                            but the steps themselves handle the content */}

                        <div
                            className={
                                currStep === "personal"
                                    ? "animate-in slide-in-from-right-4 fade-in duration-300"
                                    : "hidden"
                            }
                        >
                            <PersonalStep onNext={handleNext} />
                        </div>

                        <div
                            className={
                                currStep === "account"
                                    ? "animate-in slide-in-from-right-4 fade-in duration-300"
                                    : "hidden"
                            }
                        >
                            <AccountStep
                                onNext={handleNext}
                                onPrev={handlePrev}
                            />
                        </div>

                        <div
                            className={
                                currStep === "security"
                                    ? "animate-in slide-in-from-right-4 fade-in duration-300"
                                    : "hidden"
                            }
                        >
                            <SecurityStep
                                onPrev={handlePrev}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </Tabs>
            </form>
        </FormProvider>
    );
}
