import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    addItemToStorage,
    getItemFromStorage,
    type StorageConfig,
} from "@/utils";
import { EmailInputGroup, PasswordInputGroup } from "../form-inputs";
import { LogIn, Signature } from "lucide-react";
import { loginSchema, type LoginFormData } from "./schema";
import {
    Field,
    FieldSet,
    FieldLegend,
    FieldDescription,
    Button,
} from "@/components";
import { useAuth } from "../../hooks";
import { Link } from "react-router";

const SAVEABLE_FIELDS: (keyof StorageConfig["auth_items"])[] = ["email"];

type SaveableKey = keyof StorageConfig["auth_items"];
const isSaveableField = (key: string): key is SaveableKey => {
    return (SAVEABLE_FIELDS as string[]).includes(key);
};

export function LoginWizard() {
    const methods = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",

        defaultValues: {
            email: getItemFromStorage("auth_items", "email") ?? "",
        },
    });

    const auth = useAuth();

    if (!auth) throw new Error();

    const { login } = auth;

    const handleSubmit = (credentials: LoginFormData) => {
        try {
            login(credentials);
        } catch (err) {
            const { response } = err;
            const { data } = response;

            if (data["non_field_errors"]) {
                console.log(data);
            }
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(handleSubmit)}
                className="min-w-xs max-w-xl w-4/5 h-3/5 z-1 grid grid-rows-[1fr_auto] gap-8 bg-neutral-50/20 backdrop-blur-md border-border shadow-2xl rounded-2xl p-3 md:p-4 lg:p-5"
            >
                <FieldSet className="grid items-between h-full">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <FieldLegend>Welcome to Opus!</FieldLegend>
                            <FieldDescription>
                                Have an Account? Login Below
                            </FieldDescription>
                        </div>
                        <div className="flex flex-col gap-4">
                            <EmailInputGroup
                                name="email"
                                label="Email"
                                placeholder="name@example.com"
                            />
                            <PasswordInputGroup
                                name="password"
                                label="Password"
                                placeholder="Enter Password"
                            />
                        </div>
                    </div>
                    <Field className="flex-col items-center justify-end w-full">
                        <Button
                            className="inline-flex items-center"
                            type="submit"
                        >
                            <span>Log In</span>
                            <LogIn />
                        </Button>
                        <Link className="inline-flex" to={"/auth/register"}>
                            <Button
                                className="inline-flex flex-1 items-center"
                                variant={"secondary"}
                            >
                                <span>Sign Up</span>
                                <Signature />
                            </Button>
                        </Link>
                        <Link
                            className="inline-flex items-center justify-center"
                            to={"/auth/password/reset"}
                        >
                            <Button
                                variant={"link"}
                                className="inline-flex flex-1 items-center"
                            >
                                Forgot Password?
                            </Button>
                        </Link>
                    </Field>
                </FieldSet>
            </form>
        </FormProvider>
    );
}
