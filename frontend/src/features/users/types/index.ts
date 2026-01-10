import * as z from 'zod';

import type { UseFormReturn } from "react-hook-form";
import { updateActiveUserProfileSchema } from "../forms";

export interface UserProfile {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    full_name: string;
    avatar: string | null;
    email: string;
    user_id: number;
}

export type UpdateActiveUserProfileData = z.infer<typeof updateActiveUserProfileSchema>;

export interface UpdateActiveUserViewProps {
    methods: UseFormReturn<UpdateActiveUserProfileData>;
    onSubmit: (data: UpdateActiveUserProfileData) => Promise<void>;
    user: UserProfile;
    isPending: boolean;
}
