import { FormProvider } from "react-hook-form";
import { EmailInputGroup } from "../../components";
import type { RequestPasswordResetViewProps } from "../../types";
import { APP_PATHS } from "@/router";
import { Link } from "react-router";
import { Button, FieldLegend, FieldDescription } from "@/components";
import { KeyRound, ArrowLeft, Send } from "lucide-react";

export function RequestPasswordResetView({
    methods,
    handleSubmit,
}: RequestPasswordResetViewProps) {
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                // Consistent Glass-Card Style with Dark Mode support
                className="w-full max-w-md bg-card/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-border/50 dark:border-white/10 shadow-2xl shadow-black/40 rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-500"
            >
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-8">
                    {/* Icon Badge */}
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <KeyRound className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                        <FieldLegend className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
                            Forgot Password?
                        </FieldLegend>
                        <FieldDescription className="text-muted-foreground dark:text-zinc-400 text-base max-w-[280px] mx-auto">
                            Enter your email address and we'll send you a link
                            to reset your credentials.
                        </FieldDescription>
                    </div>
                </div>

                {/* Input Section */}
                <div className="space-y-4">
                    <EmailInputGroup
                        name="email"
                        label="Email Address"
                        placeholder="name@example.com"
                    />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-8">
                    <Button
                        type="submit"
                        className="w-full h-11 text-base shadow-md"
                        size="lg"
                    >
                        Send Reset Link
                        <Send className="ml-2 h-4 w-4" />
                    </Button>

                    <Link to={APP_PATHS.auth.login} className="w-full">
                        <Button
                            className="w-full h-11 text-muted-foreground"
                            variant="outline"
                            type="button"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 text-muted-foreground" />
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
}
