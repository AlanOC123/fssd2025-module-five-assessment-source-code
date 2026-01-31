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
    src,
    firstName = "",
    lastName = "",
}: UserAvatarProps) {
    return src ? (
        <Avatar>
            <AvatarImage src={src} />
        </Avatar>
    ) : (
        <Avatar>
            <AvatarFallback>
                {getUserInitials(firstName, lastName)}
            </AvatarFallback>
        </Avatar>
    );
}
