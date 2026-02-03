import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const updateActiveUserProfileSchema = z.object({
    first_name: z.string().min(2, "Enter a valid name").or(z.literal("")),
    last_name: z.string().min(2, "Enter a valid last name").or(z.literal("")),
    date_of_birth: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (val) {
                    return !isNaN(Date.parse(val));
                }

                return true;
            },
            {
                message: "Invalid date format",
            }
        ),
    avatar: z
        .any()
        .optional()
        .refine((files) => {
            if (!files || files.length === 0) return true;

            return files[0]?.size <= MAX_FILE_SIZE;
        }, "Max files size is 5MB")
        .refine((files) => {
            if (!files || files.length === 0) return true;

            return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)
        }, "Only .jpg, .jpeg, .png, .webp formats are supported"),
});
