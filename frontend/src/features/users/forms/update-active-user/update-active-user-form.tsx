import type { UpdateActiveUserProfileData } from "../../types";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Spinner } from "@/components";

import { updateActiveUserProfileSchema } from "../schema";
import { UpdateActiveUserView } from "./update-active-user-view";

import {
    useGetActiveUserProfile,
    useUpdateActiveUserProfile,
} from "../../hooks";

export function UpdateActiveUserForm() {
    const { data: user, isLoading } = useGetActiveUserProfile();

    const { mutateAsync: updateProfile, isPending } =
        useUpdateActiveUserProfile();

    const methods = useForm<UpdateActiveUserProfileData>({
        resolver: zodResolver(updateActiveUserProfileSchema),
        mode: "onChange",

        defaultValues: {
            first_name: "",
            last_name: "",
            date_of_birth: "",
            avatar: "",
        },
    });

    useEffect(() => {
        methods.reset({
            first_name: user.first_name,
            last_name: user.last_name,
            date_of_birth: user.date_of_birth,
        });
    }, [user, methods]);

    const onSubmit = async (data: UpdateActiveUserProfileData) => {
        try {
            const formData = new FormData();

            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);

            if (data.date_of_birth)
                formData.append("date_of_birth", data.date_of_birth);

            if (data.avatar && data.avatar.length > 0) {
                formData.append("avatar", data.avatar[0]);
            }

            await updateProfile(formData);

            toast.success("Profile Updated!")
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!")
        }
    };

    if (isLoading || !user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <UpdateActiveUserView methods={methods} user={user} isPending={isPending} onSubmit={onSubmit} />
    )
}
