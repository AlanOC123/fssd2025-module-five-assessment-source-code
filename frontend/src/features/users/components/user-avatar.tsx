import { Avatar, AvatarImage, AvatarFallback } from "@/components";
import type { UserAvatarProps } from "../types";

function getUserInitials(
    firstName: string = "",
    lastName: string = ""
): string {
    if (!(firstName && lastName)) return "";

    return (
        firstName.split("")[0].toUpperCase() +
        lastName.split("")[0].toUpperCase()
    );
}

export function UserAvatar({
    src = "",
    firstName = "",
    lastName = "",
    className = ""
}: UserAvatarProps) {
        return (
            <Avatar className={className}>
                <AvatarImage src={src} />

                <AvatarFallback>
                    {getUserInitials(firstName, lastName)}
                </AvatarFallback>
            </Avatar>
        );
}
