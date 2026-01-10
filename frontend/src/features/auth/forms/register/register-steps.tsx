import type { TabContentContainerProps, RegisterStepProps } from "../../types";
import { Link } from "react-router";

import {
    TabsContent,
    Field,
    FieldSet,
    FieldLegend,
    FieldDescription,
    Button,
} from "@/components";

import {
    NameInputGroup,
    EmailInputGroup,
    PasswordInputGroup,
    DateOfBirthInputGroup,
} from "../../components";

import {
    ArrowLeftCircle,
    ArrowRightCircle,
    UserRoundCheck,
    LogIn,
} from "lucide-react";

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
                        name={"first_name"}
                        label="First Name"
                        placeholder="Type First Name"
                    />
                    <NameInputGroup
                        name={"last_name"}
                        label="Last Name"
                        placeholder="Type Last Name"
                    />
                    <DateOfBirthInputGroup />
                </div>
            </div>
            <Field className="flex-row justify-between items-center w-full">
                <Link to={"/auth/login"} className="w-max flex-0">
                    <Button
                        className="max-w-fit inline-flex items-center"
                        variant={"secondary"}
                    >
                        <span>Log In</span>
                        <LogIn />
                    </Button>
                </Link>

                <Button
                    className="inline-flex items-center flex-1"
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
                        name="confirm_email"
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
                    className="inline-flex items-center flex-1"
                    onClick={onNext}
                >
                    <span>Next Step</span>
                    <ArrowRightCircle />
                </Button>
            </Field>
        </FieldSet>
    );
}

function SecurityFieldSet({ onPrev, isLoading }: RegisterStepProps) {
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
                    <PasswordInputGroup
                        name="password1"
                        label="Password"
                        placeholder="Create a Strong Password"
                    />
                    <PasswordInputGroup
                        name="password2"
                        label="Confirm Password"
                        placeholder="Type Password Again"
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
                    className="inline-flex flex-1 items-center"
                    type="submit"
                >
                    <span>
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </span>
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

export function SecurityStep({ onPrev, onSubmit, isLoading }: RegisterStepProps) {
    return (
        <TabContentContainer value={"security"}>
            {<SecurityFieldSet onPrev={onPrev} onSubmit={onSubmit} isLoading={isLoading} />}
        </TabContentContainer>
    );
}
