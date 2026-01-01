import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
    Field,
    FieldTitle,
    FieldDescription,
    FieldSet,
    Button,
} from "@/components";

import { resetPasswordSchema, type ResetPasswordData } from "./schema";

import { EmailInputGroup } from "../form-inputs";

import { postResetPasswordRequest } from "../../api";
import { Link } from "react-router";

export function PasswordResetWizard() {
    const methods = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    async function handleSubmit(credentials: ResetPasswordData) {
        try {
            const response = await postResetPasswordRequest(credentials);
            toast.info("Password reset link sent to email...");
            console.log(response);
        } catch (err) {
            toast.info("Password reset link sent to email...");
            console.log(err);
        }
    }

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
