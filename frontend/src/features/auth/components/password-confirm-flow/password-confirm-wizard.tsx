import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { PasswordInputGroup } from "../form-inputs";
import { postPasswordChange } from "../../api";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import {
    passwordConfimationSchema,
    type PasswordConfirmationData,
} from "./schema";
import {
    Field,
    FieldTitle,
    FieldDescription,
    FieldSet,
    Button,
} from "@/components";

export function PasswordConfirmWizard() {
    const { uid, string, token } = useParams();
    const navigate = useNavigate();

    const methods = useForm({
        resolver: zodResolver(passwordConfimationSchema),
        mode: "onChange",
    });

    async function handleSubmit(credentials: PasswordConfirmationData) {
        try {
            const response = await postPasswordChange({
                uid,
                token,
                new_password1: credentials.password,
                new_password2: credentials.confirmPassword,
            });
        
            toast.success("Password updated! Redirecting to login...");

            setTimeout(() => navigate("/auth/login"), 3000);
        } catch (err) {
            toast.error("Something went wrong!");
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
                    <FieldTitle>Change Password</FieldTitle>
                    <FieldDescription>
                        Create a strong new password and confirm it below.
                    </FieldDescription>
                    <PasswordInputGroup
                        name="password"
                        label="New Password"
                        placeholder="Create A Strong New Password"
                    />
                    <PasswordInputGroup
                        name="confirmPassword"
                        label="Confirm New Password"
                        placeholder="Type Password Again To Confirm"
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
