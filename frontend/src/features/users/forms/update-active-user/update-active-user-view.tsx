import { UserAvatar } from "../../components";

import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    Field,
    FieldGroup,
    Label,
    CardTitle,
    Input,
    FieldDescription,
    FieldError,
    FieldSeparator,
    FieldLabel,
    Button
} from "@/components";
import type { UpdateActiveUserViewProps } from "../../types";

export function UpdateActiveUserView({ methods, onSubmit, user, isPending }: UpdateActiveUserViewProps) {
    const { handleSubmit, register, formState } = methods;
    const { errors, isSubmitting, isDirty } = formState

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Update your public profile details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FieldGroup className="flex items-center gap-6">
                        <UserAvatar
                            src={user.avatar}
                            firstName={user.first_name}
                            lastName={user.last_name}
                        />

                        <Field>
                            <Label
                                htmlFor="avatar-upload"
                                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3"
                            >
                                Change Avatar
                            </Label>
                            <Input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...methods.register("avatar")}
                            />
                            <FieldDescription>
                                JPG, GIF or PNG. Max 5MB.
                            </FieldDescription>
                            {errors.avatar && (
                                <FieldError>
                                    {String(errors.avatar.message)}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>

                    <FieldGroup>
                        <FieldSeparator />
                    </FieldGroup>

                    {/* --- Text Fields --- */}
                    <FieldGroup className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="first_name">
                                First Name
                            </FieldLabel>
                            {/* 4. Direct composition using {...register} instead of Render Props */}
                            <Input
                                id="first_name"
                                placeholder={user.first_name}
                                {...register("first_name")}
                            />
                            {errors.first_name && (
                                <FieldError>
                                    {errors.first_name.message}
                                </FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="last_name">
                                Last Name
                            </FieldLabel>
                            <Input
                                id="last_name"
                                placeholder={user.last_name}
                                {...register("last_name")}
                            />
                            {errors.last_name && (
                                <FieldError>
                                    {errors.last_name.message}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>

                    <FieldGroup>
                        <FieldSeparator />
                    </FieldGroup>

                    <Field>
                        <FieldLabel htmlFor="date_of_birth">
                            Date of Birth
                        </FieldLabel>
                        <Input
                            id="date_of_birth"
                            type="date"
                            {...register("date_of_birth")}
                        />
                        {errors.date_of_birth && (
                            <FieldError>
                                {errors.date_of_birth.message}
                            </FieldError>
                        )}
                    </Field>

                    <FieldGroup className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!isDirty || isSubmitting || isPending}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
