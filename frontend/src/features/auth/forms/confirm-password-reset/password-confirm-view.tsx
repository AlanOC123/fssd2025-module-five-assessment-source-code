import type { ConfirmPasswordResetViewProps } from "../../types";
import { FormProvider } from "react-hook-form";
import { PasswordInputGroup } from "../../components";
import { APP_PATHS } from "@/router";
import { Link } from "react-router";
import { Button, FieldLegend, FieldDescription } from "@/components";
import { ShieldCheck, ArrowRight, X } from "lucide-react";

export function ConfirmPasswordResetView({
    methods,
    handleSubmit,
}: ConfirmPasswordResetViewProps) {
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                // Consistent Glass-Card Style
                className="w-full max-w-md bg-card/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-border/50 dark:border-white/10 shadow-2xl shadow-black/40 rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-500"
            >
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                        <FieldLegend className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
                            Reset Password
                        </FieldLegend>
                        <FieldDescription className="text-muted-foreground dark:text-zinc-400 text-base max-w-[260px] mx-auto">
                            Create a strong new password to secure your account.
                        </FieldDescription>
                    </div>
                </div>

                {/* Inputs */}
                <div className="space-y-5">
                    <PasswordInputGroup
                        name="password1"
                        label="New Password"
                        placeholder="Create a strong password"
                    />
                    <PasswordInputGroup
                        name="password2"
                        label="Confirm New Password"
                        placeholder="Re-type to confirm"
                    />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-8">
                    <Button
                        type="submit"
                        className="w-full h-11 text-base shadow-md"
                        size="lg"
                    >
                        Reset Password
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Link to={APP_PATHS.auth.login} className="w-full">
                        <Button
                            className="w-full h-11"
                            variant="outline"
                            type="button"
                        >
                            Cancel
                            <X className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
}
