import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components";
import type { ChangePasswordViewProps } from "../../types";
import { PasswordInputGroup } from "../../components";
import { FormProvider } from "react-hook-form";
import { Save, LockKeyhole } from "lucide-react";

export function ChangePasswordView({
    methods,
    onSubmit,
    isPending,
}: ChangePasswordViewProps) {
    return (
        <Card className="border-border/50 shadow-md bg-card/95 backdrop-blur-sm">
            <CardHeader className="border-b border-border/40 pb-6">
                <div className="flex items-center gap-4">
                    {/* Visual Icon Badge */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <LockKeyhole className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-bold tracking-tight">
                            Change Password
                        </CardTitle>
                        <CardDescription className="text-sm">
                            Ensure your account is secure with a strong, unique
                            password.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Current Password - Visually separated */}
                        <div className="space-y-4">
                            <PasswordInputGroup
                                name="old_password"
                                label="Current Password"
                                placeholder="Enter your current password"
                            />
                        </div>

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/50" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    New Credentials
                                </span>
                            </div>
                        </div>

                        {/* New Password Section */}
                        <div className="grid gap-5">
                            <PasswordInputGroup
                                name="new_password1"
                                label="New Password"
                                placeholder="Create a new password"
                            />
                            <PasswordInputGroup
                                name="new_password2"
                                label="Confirm New Password"
                                placeholder="Retype your new password"
                            />
                        </div>

                        {/* Action Footer */}
                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="min-w-[140px] shadow-sm"
                            >
                                {isPending ? (
                                    "Updating..."
                                ) : (
                                    <>
                                        Update Password
                                        <Save className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
