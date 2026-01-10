import type { ConfirmPasswordResetViewProps } from "../../types";

import { FormProvider } from "react-hook-form";
import { PasswordInputGroup } from "../../components";

import { Link } from "react-router";
import {
    Field,
    FieldTitle,
    FieldDescription,
    FieldSet,
    Button,
} from "@/components";

export function ConfirmPasswordResetView({
    methods,
    handleSubmit,
}: ConfirmPasswordResetViewProps) {

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                className="z-1 max-w-md bg-card p-4 min-w-xs rounded-2xl shadow-2xl flex items-center flex-col gap-8 justify-center"
            >
                <FieldSet>
                    <FieldTitle>Change Password</FieldTitle>
                    <FieldDescription>
                        Create a strong new password and confirm it below.
                    </FieldDescription>
                    <PasswordInputGroup
                        name="password1"
                        label="New Password"
                        placeholder="Create A Strong New Password"
                    />
                    <PasswordInputGroup
                        name="password2"
                        label="Confirm New Password"
                        placeholder="Type Password Again To Confirm"
                    />
                </FieldSet>
                <Field className="flex-row justify-center items-center gap-2">
                    <Button type="submit" className="flex-1" variant={"default"}>
                        Submit
                    </Button>
                    <Link to={"/auth/login"}>
                        <Button className="flex-1" variant={"destructive"}>
                            Cancel
                        </Button>
                    </Link>
                </Field>
            </form>
        </FormProvider>
    );
}
