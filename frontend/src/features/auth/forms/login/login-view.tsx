import { FormProvider } from "react-hook-form";
import { FieldLegend, FieldDescription, Button } from "@/components";
import { EmailInputGroup, PasswordInputGroup } from "../../components";
import { Link } from "react-router";
import { LogIn, Signature } from "lucide-react";
import type { LoginViewProps } from "../../types";
import { APP_PATHS } from "@/router";

export function LoginView({ methods, isPending, onSubmit }: LoginViewProps) {
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                // Design Update: High opacity background for contrast, subtle border, and smooth entry animation
                className="w-full max-w-md bg-card/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-500"
            >
                <div className="flex flex-col gap-8">
                    {/* Header Section: Centered with better hierarchy */}
                    <div className="text-center space-y-2">
                        <FieldLegend className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome Back
                        </FieldLegend>
                        <FieldDescription className="text-muted-foreground text-base">
                            Enter your credentials to access Opus
                        </FieldDescription>
                    </div>

                    {/* Inputs Section */}
                    <div className="space-y-5">
                        <EmailInputGroup
                            name="email"
                            label="Email Address"
                            placeholder="name@example.com"
                        />
                        <div className="space-y-1">
                            <PasswordInputGroup
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                            />
                            {/* UX Improvement: Forgot Password placed near the input */}
                            <div className="flex justify-end">
                                <Link
                                    to={APP_PATHS.auth.passwordReset}
                                    className="text-xs font-medium text-primary hover:text-primary/80 hover:underline transition-colors px-1"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="space-y-4 pt-2">
                        <Button
                            className="w-full h-11 text-base shadow-md hover:shadow-lg transition-all duration-300"
                            type="submit"
                            disabled={isPending}
                        >
                            <span>
                                {isPending ? "Signing In..." : "Sign In"}
                            </span>
                            {!isPending && <LogIn className="ml-2 h-4 w-4" />}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    New here?
                                </span>
                            </div>
                        </div>

                        <Link
                            className="block w-full"
                            to={APP_PATHS.auth.register}
                        >
                            <Button
                                className="w-full h-11 border-dashed text-muted-foreground"
                                variant="outline"
                                type="button"
                            >
                                <span>Create an Account</span>
                                <Signature className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
