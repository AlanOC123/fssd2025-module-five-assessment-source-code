import { FormProvider } from "react-hook-form";
import {
    FieldSet,
    FieldTitle,
    FieldDescription,
    Button,
    Field,
} from "@/components";
import { Link } from "react-router";
import { EmailInputGroup } from "../../components";
import type { RequestPasswordResetViewProps } from "../../types";

export function RequestPasswordResetView({
    methods,
    handleSubmit,
}: RequestPasswordResetViewProps) {
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                className="z-1 max-w-md bg-card p-4 min-w-xs rounded-2xl shadow-2xl flex items-center flex-col gap-8 justify-center"
            >
                <FieldSet>
                    <FieldTitle>Reset Password</FieldTitle>
                    <FieldDescription>
                        Forgot password? Enter your email below and we'll send a
                        link.
                    </FieldDescription>
                    <EmailInputGroup
                        name="email"
                        label="Email"
                        placeholder="Type Email"
                    />
                </FieldSet>
                <Field className="flex-row justify-center items-center gap-2">
                    <Button className="flex-1" variant={"default"}>
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
