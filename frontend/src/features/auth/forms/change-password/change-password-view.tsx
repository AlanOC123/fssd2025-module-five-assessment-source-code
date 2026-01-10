import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button, Field } from "@/components";
import type { ChangePasswordViewProps } from "../../types";
import { PasswordInputGroup } from "../../components";
import { FormProvider } from "react-hook-form";

export function ChangePasswordView({
    methods,
    onSubmit,
    isPending,
}: ChangePasswordViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Ensure your account is using a long, random password to stay
                    secure.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <PasswordInputGroup
                            name="old_password"
                            label="Current Password"
                            placeholder="Enter current password"
                        />
                        <PasswordInputGroup
                            name="new_password1"
                            label="New Password"
                            placeholder="Create new password"
                        />
                        <PasswordInputGroup
                            name="new_password2"
                            label="Confirm New Password"
                            placeholder="Type new password again"
                        />

                        <Field className="flex justify-end pt-2">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Updating..." : "Update Password"}
                            </Button>
                        </Field>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
