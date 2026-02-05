import type { UpdateActiveUserProfileData } from "../../types";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
        },
    });

    // Populate form when user data loads
    useEffect(() => {
        if (user) {
            methods.reset({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                date_of_birth: user.date_of_birth || "",
            });
        }
    }, [user, methods]);

    const onSubmit = async (data: UpdateActiveUserProfileData) => {
        try {
            // Needs to be parsed into form data for the JSONParser, MultiPartParser and FormParser to collect the image
            const formData = new FormData();

            // 1. Append Text Fields
            formData.append("first_name", data.first_name);
            formData.append("last_name", data.last_name);
            if (data.date_of_birth) {
                formData.append("date_of_birth", data.date_of_birth);
            }

            // 2. Append File (Check strictly for FileList length)
            if (data.avatar && data.avatar.length > 0) {
                // Takes the first file from the FileList
                formData.append("avatar", data.avatar[0]);
            }

            // 3. DEBUG: Check what we are sending
            // FormData is opaque, so we can't just console.log(formData).
            // We have to iterate to see entries.
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            // 4. Send directly (No { data: ... } wrapper)
            await updateProfile(formData);
        } catch (err) {
            console.error(err);
            // Toast is handled in the hook onError, but you can keep it here too if you prefer
        }
    };

    if (isLoading || !user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                {/* Ensure Spinner is imported */}
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <UpdateActiveUserView
            methods={methods}
            user={user}
            isPending={isPending}
            onSubmit={onSubmit}
        />
    );
}
