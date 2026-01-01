import { type ReactNode } from "react";
import {
    TabsContent,
    Field,
    FieldSet,
    FieldLegend,
    FieldDescription,
    Button,
} from "@/components";
import { type RegisterStep } from "./schema";
import {
    NameInputGroup,
    EmailInputGroup,
    PasswordInputGroup,
    DateOfBirthInputGroup,
} from "../form-inputs";
import {
    ArrowLeftCircle,
    ArrowRightCircle,
    UserRoundCheck,
    LogIn,
} from "lucide-react";
import { Link } from "react-router";

interface TabContentContainerProps {
    value: RegisterStep;
    children: ReactNode;
}

interface RegisterStepProps {
    onNext?: () => void;
    onPrev?: () => void;
    onSubmit?: () => void;
}

function TabContentContainer({ value, children }: TabContentContainerProps) {
    return (
        <TabsContent
            value={value}
            className="bg-neutral-50/20 backdrop-blur-md border-border shadow-2xl rounded-2xl p-3 md:p-4 lg:p-5 h-full"
        >
            {children}
        </TabsContent>
    );
}

function PersonalFieldSet({ onNext }: RegisterStepProps) {
    return (
        <FieldSet className="grid items-between h-full">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <FieldLegend>Personal Details</FieldLegend>
                    <FieldDescription>
                        Tell us more about yourself
                    </FieldDescription>
                </div>
                <div className="flex flex-col gap-4">
                    <NameInputGroup
                        name={"firstName"}
                        label="First Name"
                        placeholder="Type First Name"
                    />
                    <NameInputGroup
                        name={"lastName"}
                        label="Last Name"
                        placeholder="Type Last Name"
                    />
                    <DateOfBirthInputGroup />
                </div>
            </div>
            <Field className="flex-row justify-between items-center w-full">
                <Link to={"/login"}>
                    {" "}
                    <Button
                        className="max-w-fit inline-flex items-center"
                        variant={"secondary"}
                    >
                        <span>Log In</span>
                        <LogIn />
                    </Button>
                </Link>

                <Button
                    className="max-w-fit inline-flex items-center"
                    onClick={onNext}
                >
                    <span>Next Step</span>
                    <ArrowRightCircle />
                </Button>
            </Field>
        </FieldSet>
    );
}

function AccountFieldSet({ onNext, onPrev }: RegisterStepProps) {
    return (
        <FieldSet className="grid items-between h-full">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <FieldLegend>Account Details</FieldLegend>
                    <FieldDescription>
                        Connect an email to your account
                    </FieldDescription>
                </div>
                <div className="flex flex-col gap-4">
                    <EmailInputGroup
                        name="email"
                        label="Email"
                        placeholder="name@example.com"
                    />
                    <EmailInputGroup
                        name="confirmEmail"
                        label="Confirm Email"
                        placeholder="Type Email Again"
                    />
                </div>
            </div>
            <Field className="flex-row justify-between items-center w-full">
                <Button
                    className="max-w-fit inline-flex items-center"
                    variant={"secondary"}
                    onClick={onPrev}
                >
                    <ArrowLeftCircle />
                    <span>Previous Step</span>
                </Button>

                <Button
                    className="max-w-fit inline-flex items-center"
                    onClick={onNext}
                >
                    <span>Next Step</span>
                    <ArrowRightCircle />
                </Button>
            </Field>
        </FieldSet>
    );
}

function SecurityFieldSet({ onPrev }: RegisterStepProps) {
    return (
        <FieldSet className="grid items-between h-full">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <FieldLegend>Security Details</FieldLegend>
                    <FieldDescription>
                        Create a strong password
                    </FieldDescription>
                </div>
                <div className="flex flex-col gap-4">
                    <PasswordInputGroup name="password" label="Password" placeholder="Create a Strong Password" />
                    <PasswordInputGroup name="confirmPassword" label="Confirm Password" placeholder="Type Password Again" />
                </div>
            </div>
            <Field className="flex-row justify-between items-center w-full">
                <Button
                    className="max-w-fit inline-flex items-center"
                    variant={"secondary"}
                    onClick={onPrev}
                >
                    <ArrowLeftCircle />
                    <span>Previous Step</span>
                </Button>
                <Button
                    className="inline-flex flex-1 items-center"
                    type="submit"
                >
                    <span>Create Account</span>
                    <UserRoundCheck />
                </Button>
            </Field>
        </FieldSet>
    );
}

export function PersonalStep({ onNext }: RegisterStepProps) {
    return (
        <TabContentContainer value={"personal"}>
            {<PersonalFieldSet onNext={onNext} />}
        </TabContentContainer>
    );
}

export function AccountStep({ onNext, onPrev }: RegisterStepProps) {
    return (
        <TabContentContainer value={"account"}>
            {<AccountFieldSet onNext={onNext} onPrev={onPrev} />}
        </TabContentContainer>
    );
}

export function SecurityStep({ onPrev, onSubmit }: RegisterStepProps) {
    return (
        <TabContentContainer value={"security"}>
            {<SecurityFieldSet onPrev={onPrev} onSubmit={onSubmit} />}
        </TabContentContainer>
    );
}
