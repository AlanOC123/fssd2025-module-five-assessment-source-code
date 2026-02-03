import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, type UpdateProfileData } from "../schemas";

// 1. We import the new Field primitives instead of Form*
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
} from "@/components/ui/field";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Label,
} from "@/components";

import { useAuth } from "@/features/auth";
import { UserAvatar } from "./user-avatar";

export function ProfileSettingsTab() {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            first_name: user?.profile.first_name || "",
            last_name: user?.profile.last_name || "",
            date_of_birth: user?.profile.date_of_birth || "",
        },
    });

    const onSubmit = async (data: UpdateProfileData) => {
        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("date_of_birth", data.date_of_birth);

        if (data.avatar && data.avatar.length > 0) {
            formData.append("avatar", data.avatar[0]);
        }

        console.log("Sending Form Data:", Object.fromEntries(formData));
        // await updateProfile(formData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Update your public profile details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* 3. No <Form {...form}> wrapper needed anymore, just a standard <form> */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* --- Avatar Section --- */}
                    <div className="flex items-center gap-6">
                        <UserAvatar
                            src={}
                            className="h-20 w-20"
                        />

                        {/* We use Field here to wrap the file input logic nicely */}
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
                                {...register("avatar")}
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
                    </div>

                    {/* --- Text Fields --- */}
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="first_name">
                                First Name
                            </FieldLabel>
                            {/* 4. Direct composition using {...register} instead of Render Props */}
                            <Input
                                id="first_name"
                                placeholder="Alan"
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
                                placeholder="O'Connor"
                                {...register("last_name")}
                            />
                            {errors.last_name && (
                                <FieldError>
                                    {errors.last_name.message}
                                </FieldError>
                            )}
                        </Field>
                    </div>

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

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!isDirty || isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
