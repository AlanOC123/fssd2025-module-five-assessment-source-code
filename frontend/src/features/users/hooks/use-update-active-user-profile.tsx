import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    updateActiveUserProfile,
    type UpdateActiveUserRequest,
} from "../services";
import { ACTIVE_USER_QUERY_KEY } from "./keys";
import { toast } from "sonner";

export function useUpdateActiveUserProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        // Simplified: Recieves formData, passes formData. No wrapper objects.
        mutationFn: (formData: UpdateActiveUserRequest) =>
            updateActiveUserProfile(formData),

        onSuccess: () => {
            toast.success("Profile updated successfully!");
            // Invalidate the 'active user' query to fetch the new avatar immediately
            queryClient.invalidateQueries({
                queryKey: ACTIVE_USER_QUERY_KEY,
            });
        },
        onError: (err) => {
            console.error(err);
            toast.error("Failed to update profile.");
        },
    });
}
